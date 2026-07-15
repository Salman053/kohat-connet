'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/dashboard/toast'
import DataTable from '@/components/dashboard/data-table'
import type { Column } from '@/components/dashboard/data-table'
import StatusBadge from '@/components/dashboard/status-badge'
import { Eye, MousePointer2, Calendar, Check, X, Megaphone } from 'lucide-react'

type Props = { initialAds: any[] }

export default function AdminAdsTable({ initialAds }: Props) {
  const [ads, setAds] = useState(initialAds)
  const supabase = createClient()
  const { toast } = useToast()

  const refresh = useCallback(async () => {
    const { data } = await supabase
      .from('advertisements')
      .select('*, user:profiles(email, full_name, business_name)')
      .order('created_at', { ascending: false })
    if (data) setAds(data)
  }, [supabase])

  const handleStatusChange = useCallback(async (id: string, status: string) => {
    const { error } = await supabase.from('advertisements').update({ ad_status: status }).eq('id', id)
    if (error) { toast(error.message, 'error') } else { refresh() }
  }, [supabase, toast, refresh])

  const calcCTR = (imp: number, cl: number) => imp === 0 ? '0' : ((cl / imp) * 100).toFixed(2)

  const columns: Column<any>[] = [
    {
      key: 'title', header: 'Advertisement', sortable: true,
      render: (item) => (
        <div className="flex items-start gap-3">
          {item.image_url && (
            <img src={item.image_url} alt={item.title} className="h-12 w-20 object-cover rounded-lg shrink-0" />
          )}
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400 truncate max-w-[180px]">{item.description}</p>
            {item.redirect_url && <p className="text-[10px] text-blue-600 truncate max-w-[180px]">{item.redirect_url}</p>}
          </div>
        </div>
      ),
    },
    {
      key: 'ad_type', header: 'Type', sortable: true,
      render: (item) => <StatusBadge value={item.ad_type} />,
    },
    {
      key: 'user', header: 'Advertiser',
      render: (item) => (
        <span className="text-sm text-gray-600">{item.user?.business_name || item.user?.full_name || item.user?.email || '—'}</span>
      ),
    },
    {
      key: 'schedule', header: 'Schedule',
      render: (item) => (
        <div className="text-xs text-gray-500 space-y-0.5">
          <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(item.start_date).toLocaleDateString()}</div>
          <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(item.end_date).toLocaleDateString()}</div>
        </div>
      ),
    },
    {
      key: 'performance', header: 'Performance',
      render: (item) => (
        <div className="text-xs text-gray-500 space-y-0.5">
          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.impressions} views</span>
          <span className="flex items-center gap-1"><MousePointer2 className="h-3 w-3" />{item.clicks} clicks</span>
          <span className="text-gray-400">CTR: {calcCTR(item.impressions, item.clicks)}%</span>
        </div>
      ),
    },
    {
      key: 'ad_status', header: 'Status', sortable: true,
      render: (item) => <StatusBadge value={item.ad_status} type="ad" />,
    },
    {
      key: 'id', header: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          {item.ad_status === 'pending' && (
            <>
              <button onClick={() => handleStatusChange(item.id, 'active')}
                className="p-1.5 rounded-lg text-green-600 hover:bg-green-50" title="Approve">
                <Check className="h-4 w-4" />
              </button>
              <button onClick={() => handleStatusChange(item.id, 'cancelled')}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50" title="Reject">
                <X className="h-4 w-4" />
              </button>
            </>
          )}
          {item.ad_status === 'active' && (
            <button onClick={() => handleStatusChange(item.id, 'paused')}
              className="p-1.5 rounded-lg text-yellow-600 hover:bg-yellow-50" title="Pause">
              <Megaphone className="h-4 w-4" />
            </button>
          )}
          {item.ad_status === 'paused' && (
            <button onClick={() => handleStatusChange(item.id, 'active')}
              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50" title="Resume">
              <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={ads}
      keyField="id"
      searchPlaceholder="Search advertisements..."
      emptyMessage="No advertisements found"
    />
  )
}