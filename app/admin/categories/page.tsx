import { createClient } from '@/lib/supabase/server'
import CategoriesManager from '../_components/categories-manager'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  return <CategoriesManager initialCategories={categories || []} />
}