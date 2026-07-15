'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/dashboard/toast'
import DataTable from '@/components/dashboard/data-table'
import type { Column } from '@/components/dashboard/data-table'
import StatusBadge from '@/components/dashboard/status-badge'
import ActionButtons from '@/components/dashboard/action-buttons'
import { Building2, Eye, Star, Check, X } from 'lucide-react'

type Props = {
  initialListings: any[]
}

export default function AdminListingsTable({ initialListings }: Props) {
  const [listings, setListings] = useState(initialListings)
  const supabase = createClient()
  const { toast } = useToast()

  const refresh = useCallback(async () => {
    const { data } = await supabase
      .from('listings')
      .select('*, category:categories(name), user:profiles(email, full_name)')
      .order('created_at', { ascending: false })
    if (data) setListings(data)
  }, [supabase])

  const handleStatusChange = useCallback(async (id: string, status: string) => {
    const { error } = await supabase.from('listings').update({ status }).eq('id', id)
    if (error) { toast(error.message, 'error') } else { toast(`Listing ${status}`, 'success'); refresh() }
  }, [supabase, toast, refresh])

  const handleFeaturedToggle = useCallback(async (id: string, current: boolean) => {
    const { error } = await supabase.from('listings').update({ is_featured: !current }).eq('id', id)
    if (error) { toast(error.message, 'error') } else { refresh() }
  }, [supabase, toast, refresh])

  const handleVerifiedToggle = useCallback(async (id: string, current: boolean) => {
    const { error } = await supabase.from('listings').update({ is_verified: !current }).eq('id', id)
    if (error) { toast(error.message, 'error') } else { refresh() }
  }, [supabase, toast, refresh])

  const columns: Column<any>[] = [
    {
      key: 'title', header: 'Listing', sortable: true,
      render: (item) => (
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400 truncate max-w-[220px]">{item.description?.slice(0, 80)}</p>
            <div className="flex gap-2 mt-1">
              {item.is_featured && <span className="text-[10px] font-semibold bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">Featured</span>}
              {item.is_verified && <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Verified</span>}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'category', header: 'Category',
      render: (item) => <span className="text-sm text-gray-500">{item.category?.name || '—'}</span>,
    },
    {
      key: 'user', header: 'Owner',
      render: (item) => (
        <span className="text-sm text-gray-600">{item.user?.full_name || item.user?.email || '—'}</span>
      ),
    },
    {
      key: 'status', header: 'Status', sortable: true,
      render: (item) => (
        <div className="flex items-center gap-1">
          <StatusBadge value={item.status} type="listing" />
          {item.status === 'pending' && (
            <div className="flex gap-0.5">
              <button onClick={() => handleStatusChange(item.id, 'approved')}
                className="p-1 text-green-600 hover:bg-green-50 rounded" title="Approve">
                <Check className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => handleStatusChange(item.id, 'rejected')}
                className="p-1 text-red-600 hover:bg-red-50 rounded" title="Reject">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'stats', header: 'Stats',
      render: (item) => (
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{item.views || 0}</span>
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{item.rating?.toFixed(1) || '0'}</span>
        </div>
      ),
    },
    {
      key: 'id', header: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          <button onClick={() => handleFeaturedToggle(item.id, item.is_featured)}
            className={`p-1.5 rounded-lg ${item.is_featured ? 'text-yellow-600 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'}`} title="Toggle Featured">
            <Star className="h-4 w-4" />
          </button>
          <button onClick={() => handleVerifiedToggle(item.id, item.is_verified)}
            className={`p-1.5 rounded-lg ${item.is_verified ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`} title="Toggle Verified">
            <Check className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={listings}
      keyField="id"
      searchPlaceholder="Search listings..."
      emptyMessage="No listings found"
    />
  )
}