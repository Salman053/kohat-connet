'use client'

import Link from 'next/link'
import { Plus, Megaphone, Eye, TrendingUp } from 'lucide-react'
import DataTable from '@/components/dashboard/data-table'
import type { Column } from '@/components/dashboard/data-table'
import PageHeader from '@/components/dashboard/page-header'
import StatusBadge from '@/components/dashboard/status-badge'
import ActionButtons from '@/components/dashboard/action-buttons'

type Props = {
  initialAds: any[]
}

export default function AdsClient({ initialAds }: Props) {
  const columns: Column<any>[] = [
    {
      key: 'title', header: 'Title', sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
            <Megaphone className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400">{item.ad_type}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'ad_type', header: 'Type', sortable: true,
      render: (item) => (
        <StatusBadge value={item.ad_type} type="default" />
      ),
    },
    {
      key: 'ad_status', header: 'Status', sortable: true,
      render: (item) => <StatusBadge value={item.ad_status} type="ad" />,
    },
    {
      key: 'impressions', header: 'Impressions', sortable: true,
      render: (item) => (
        <span className="flex items-center gap-1 text-gray-500">
          <Eye className="h-3.5 w-3.5" /> {item.impressions || 0}
        </span>
      ),
    },
    {
      key: 'clicks', header: 'Clicks', sortable: true,
      render: (item) => (
        <span className="flex items-center gap-1 text-gray-500">
          <TrendingUp className="h-3.5 w-3.5" /> {item.clicks || 0}
        </span>
      ),
    },
    {
      key: 'start_date', header: 'Start', sortable: true,
      render: (item) => new Date(item.start_date).toLocaleDateString(),
    },
    {
      key: 'end_date', header: 'End', sortable: true,
      render: (item) => new Date(item.end_date).toLocaleDateString(),
    },
    {
      key: 'id', header: 'Actions',
      render: (item) => <ActionButtons editUrl={`/dashboard/ads/${item.id}/edit`} />,
    },
  ]

  return (
    <div>
      <PageHeader
        title="My Advertisements"
        subtitle="Manage your ad campaigns and track performance"
        action={
          <Link href="/dashboard/ads/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="h-4 w-4" /> Book Advertisement
          </Link>
        }
      />
      <DataTable
        columns={columns}
        data={initialAds}
        keyField="id"
        searchPlaceholder="Search advertisements..."
        emptyMessage="No advertisements yet. Book your first ad to promote your business."
      />
    </div>
  )
}