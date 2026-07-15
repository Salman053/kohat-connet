'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/dashboard/toast'
import DataTable from '@/components/dashboard/data-table'
import type { Column } from '@/components/dashboard/data-table'
import PageHeader from '@/components/dashboard/page-header'
import ImageUpload from '@/components/dashboard/image-upload'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, FolderTree, X, Eye, EyeOff } from 'lucide-react'

type Props = {
  initialCategories: any[]
}

export default function CategoriesManager({ initialCategories }: Props) {
  const [categories, setCategories] = useState(initialCategories)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const supabase = createClient()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '', description: '', slug: '', image_url: '', type: '', icon: '', is_active: true, sort_order: 0
  })

  const refresh = useCallback(async () => {
    const { data } = await supabase.from('categories').select('*').order('sort_order', { ascending: true })
    if (data) setCategories(data)
  }, [supabase])

  const openCreate = () => {
    setEditing(null)
    setFormData({ name: '', description: '', slug: '', image_url: '', type: '', icon: '', is_active: true, sort_order: 0 })
    setShowModal(true)
  }

  const openEdit = (cat: any) => {
    setEditing(cat)
    setFormData({
      name: cat.name, description: cat.description || '', slug: cat.slug,
      image_url: cat.image_url || '', type: cat.type || '', icon: cat.icon || '',
      is_active: cat.is_active, sort_order: cat.sort_order
    })
    setShowModal(true)
  }

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) { toast(error.message, 'error') } else { toast('Category deleted', 'success'); refresh() }
  }, [supabase, toast, refresh])

  const handleToggleActive = useCallback(async (id: string, current: boolean) => {
    const { error } = await supabase.from('categories').update({ is_active: !current }).eq('id', id)
    if (error) { toast(error.message, 'error') } else { refresh() }
  }, [supabase, toast, refresh])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      const { error } = await supabase.from('categories').update(formData).eq('id', editing.id)
      if (error) { toast(error.message, 'error') } else { toast('Category updated', 'success'); setShowModal(false); refresh() }
    } else {
      const { error } = await supabase.from('categories').insert(formData)
      if (error) { toast(error.message, 'error') } else { toast('Category created', 'success'); setShowModal(false); refresh() }
    }
  }

  const columns: Column<any>[] = [
    {
      key: 'name', header: 'Category', sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <FolderTree className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-400 truncate max-w-[200px]">{item.description}</p>
          </div>
        </div>
      ),
    },
    { key: 'type', header: 'Type', sortable: true, render: (item) => <span className="text-sm text-gray-500">{item.type || '—'}</span> },
    { key: 'slug', header: 'Slug', render: (item) => <span className="text-xs font-mono text-gray-400">{item.slug}</span> },
    { key: 'sort_order', header: 'Order', sortable: true, render: (item) => <span className="text-sm text-gray-500">{item.sort_order}</span> },
    {
      key: 'is_active', header: 'Status', sortable: true,
      render: (item) => (
        <button onClick={() => handleToggleActive(item.id, item.is_active)}
          className={`inline-flex items-center gap-1 text-sm ${item.is_active ? 'text-green-600' : 'text-gray-400'}`}>
          {item.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          {item.is_active ? 'Active' : 'Inactive'}
        </button>
      ),
    },
    {
      key: 'id', header: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
            <Eye className="h-4 w-4" />
          </button>
          <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
            <X className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Category Management"
        subtitle="Organize and manage categories"
        action={
          <Button onClick={openCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={categories}
        keyField="id"
        searchPlaceholder="Search categories..."
        emptyMessage="No categories found"
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  {editing ? 'Edit Category' : 'Add Category'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <Input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Category name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2} placeholder="Category description" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                  <Input type="text" required value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="category-slug" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <ImageUpload folder="categories" currentImage={formData.image_url}
                    onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <Input type="text" value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="e.g., service, product" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                    <Input type="number" value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <Input type="text" value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Icon identifier" />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="h-4 w-4 text-primary border-gray-300 rounded" />
                  Active
                </label>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button type="submit">{editing ? 'Update' : 'Create'}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}