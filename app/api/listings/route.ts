import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = getSupabase()
    let query = supabase
      .from('listings')
      .select(`
        *,
        category:categories(name, slug, image_url),
        user:profiles(full_name, business_name, avatar_url)
      `)
      .eq('status', 'approved')

    if (category) {
      query = query.eq('category_id', category)
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      listings: data,
      count,
      limit,
      offset
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get user from session
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = getSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const listingData = {
      user_id: user.id,
      category_id: body.category_id,
      title: body.title,
      description: body.description,
      address: body.address,
      phone: body.phone,
      email: body.email,
      website: body.website,
      latitude: body.latitude,
      longitude: body.longitude,
      images: body.images || [],
      price_range: body.price_range,
      status: 'pending',
      is_featured: false,
      is_verified: false,
      views: 0,
      rating: 0,
      review_count: 0
    }

    const { data, error } = await supabase
      .from('listings')
      .insert(listingData)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
