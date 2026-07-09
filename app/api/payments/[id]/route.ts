import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Update payment with review information
    const updateData: any = {
      status: body.status,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString()
    }

    if (body.status === 'rejected' && body.rejection_reason) {
      updateData.rejection_reason = body.rejection_reason
    }

    const { data, error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    // If payment is approved, activate the advertisement
    if (body.status === 'completed' && data.advertisement_id) {
      await supabase
        .from('advertisements')
        .update({ ad_status: 'active' })
        .eq('id', data.advertisement_id)
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
