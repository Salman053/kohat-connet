'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Building2, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/dashboard/toast'
import DataTable from '@/components/dashboard/data-table'
import type { Column } from '@/components/dashboard/data-table'
import PageHeader from '@/components/dashboard/page-header'
import StatusBadge from '@/components/dashboard/status-badge'
import ActionButtons from '@/components/dashboard/action-buttons'

type Props = {
  initialListings: any[]
}

export default function ListingsClient({ initialListings }: Props) {
  const [listings, setListings] = useState(initialListings)
  const supabase = createClient()
  const { toast } = useToast()

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return
    const { error } = await supabase.from('listings').delete().eq('id', id)
    if (error) {
      toast(error.message, 'error')
    } else {
      setListings(prev => prev.filter(l => l.id !== id))
      toast('Listing deleted successfully', 'success')
    }
  }, [supabase, toast])

  const columns: Column<any>[] = [
    {
      key: 'title', header: 'Title', sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <Building2 className="h-5 w-5 text-indigo-500" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400 truncate max-w-[200px]">{item.description?.slice(0, 60)}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', header: 'Category', sortable: true },
    {
      key: 'status', header: 'Status', sortable: true,
      render: (item) => <StatusBadge value={item.status} type="listing" />,
    },
    {
      key: 'views', header: 'Views', sortable: true,
      render: (item) => (
        <span className="flex items-center gap-1 text-gray-500">
          <Eye className="h-3.5 w-3.5" /> {item.views || 0}
        </span>
      ),
    },
    {
      key: 'created_at', header: 'Created', sortable: true,
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
    {
      key: 'id', header: 'Actions',
      render: (item) => (
        <ActionButtons
          viewUrl={`/listings/${item.slug || item.id}`}
          editUrl={`/dashboard/listings/${item.id}/edit`}
          onDelete={() => handleDelete(item.id)}
        />
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="My Listings"
        subtitle="Manage your business listings"
        action={
          <Link href="/dashboard/listings/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="h-4 w-4" /> Add Listing
          </Link>
        }
      />
      <DataTable
        columns={columns}
        data={listings}
        keyField="id"
        searchPlaceholder="Search listings..."
        emptyMessage="No listings yet. Create your first listing to get started."
      />
    </div>
  )
}