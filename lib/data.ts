import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getFeaturedListings(limit = 6) {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(name, slug, image_url),
      user:profiles(full_name, business_name, avatar_url)
    `)
    .eq('status', 'approved')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured listings:', error)
    return []
  }

  return data || []
}

export async function getListingsByCategory(categorySlug: string, limit = 10) {
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return []

  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(name, slug, image_url),
      user:profiles(full_name, business_name, avatar_url)
    `)
    .eq('category_id', category.id)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching listings by category:', error)
    return []
  }

  return data || []
}

export async function getActiveAdvertisements(type?: string, limit = 5) {
  let query = supabase
    .from('advertisements')
    .select('*')
    .eq('ad_status', 'active')
    .gte('start_date', new Date().toISOString())
    .lte('end_date', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(limit)

  if (type) {
    query = query.eq('ad_type', type)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching advertisements:', error)
    return []
  }

  return data || []
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export async function getBloodDonors(bloodType?: string, limit = 10) {
  let query = supabase
    .from('blood_donors')
    .select('*')
    .eq('is_available', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (bloodType) {
    query = query.eq('blood_type', bloodType)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching blood donors:', error)
    return []
  }

  return data || []
}

export async function getCommunityPosts(postType?: string, limit = 10) {
  let query = supabase
    .from('community_posts')
    .select(`
      *,
      user:profiles(full_name, avatar_url),
      category:categories(name)
    `)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (postType) {
    query = query.eq('post_type', postType)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching community posts:', error)
    return []
  }

  return data || []
}

export async function searchListings(query: string, limit = 20) {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(name, slug, image_url),
      user:profiles(full_name, business_name, avatar_url)
    `)
    .eq('status', 'approved')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error searching listings:', error)
    return []
  }

  return data || []
}
