'use client'

import { useState, useEffect } from 'react'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { Search, Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormField, FormActions } from '@/components/shared/form-field'
import Image from 'next/image'

const supabase = createSupabaseClient()

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image: string | null
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  views_count: number
  published_at: string | null
  created_at: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', excerpt: '', cover_image: '', tags: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    is_featured: false,
  })


  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
    if (error) { console.error('Error:', error); setPosts([]) }
    else { setPosts(data || []) }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingPost(null)
    setFormData({ title: '', slug: '', content: '', excerpt: '', cover_image: '', tags: '', status: 'draft', is_featured: false })
    setShowModal(true)
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title, slug: post.slug, content: post.content,
      excerpt: post.excerpt || '', cover_image: post.cover_image || '',
      tags: post.tags?.join(', ') || '', status: post.status, is_featured: post.is_featured,
    })
    setShowModal(true)
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Delete this blog post?')) return
    await supabase.from('blogs').delete().eq('id', postId)
    fetchPosts()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      updated_at: new Date().toISOString(),
    }
    if (editingPost) {
      await supabase.from('blogs').update(payload).eq('id', editingPost.id)
    } else {
      await supabase.from('blogs').insert({ ...payload, created_at: new Date().toISOString() })
    }
    setShowModal(false)
    fetchPosts()
  }

  const handleToggleStatus = async (postId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    await supabase.from('blogs').update({ status: newStatus }).eq('id', postId)
    fetchPosts()
  }

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }
  useEffect(() => { fetchPosts() }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        <Button onClick={handleCreate}>
          <Plus className="h-5 w-5 mr-1.5" />
          New Post
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Input
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading blog posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm ? 'No posts match your search.' : 'No blog posts yet. Create your first post!'}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {post.cover_image && (
                        <Image width={64} height={48} src={post.cover_image} alt={post.title} className="h-12 w-16 object-cover rounded" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        {post.excerpt && <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>}
                        {post.is_featured && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded font-medium mt-1 inline-block">Featured</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadge(post.status)}`}>{post.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.views_count || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon-xs" onClick={() => handleToggleStatus(post.id, post.status)} title={post.status === 'published' ? 'Unpublish' : 'Publish'}>
                        {post.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon-xs" onClick={() => handleEdit(post)} title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon-xs" onClick={() => handleDelete(post.id)} title="Delete">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                      {post.status === 'published' && (
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="icon-xs" title="View">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{editingPost ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Title" required>
                    <Input value={formData.title} onChange={(e) => setFormData({
                      ...formData, title: e.target.value,
                      slug: editingPost ? formData.slug : generateSlug(e.target.value)
                    })} />
                  </FormField>
                  <FormField label="Slug" required>
                    <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                  </FormField>
                </div>
                <FormField label="Excerpt">
                  <Textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={2} />
                </FormField>
                <FormField label="Content" required>
                  <Textarea required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={10} className="font-mono" />
                </FormField>
                <FormField label="Cover Image URL">
                  <Input type="url" value={formData.cover_image} onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })} />
                </FormField>
                <FormField label="Tags (comma separated)">
                  <Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="tourism, food, culture" />
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Status">
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as any })}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <div className="flex items-end pb-1">
                    <Label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox checked={formData.is_featured} onCheckedChange={(c) => setFormData({ ...formData, is_featured: c as boolean })} />
                      <span className="text-sm font-medium text-foreground">Featured Post</span>
                    </Label>
                  </div>
                </div>
                <FormActions>
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button type="submit">{editingPost ? 'Update Post' : 'Create Post'}</Button>
                </FormActions>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
