'use client'

import DataTable from '@/components/dashboard/data-table'
import type { Column } from '@/components/dashboard/data-table'
import PageHeader from '@/components/dashboard/page-header'
import StatusBadge from '@/components/dashboard/status-badge'
import { CreditCard } from 'lucide-react'

type Props = {
  initialPayments: any[]
}

export default function PaymentsClient({ initialPayments }: Props) {
  const columns: Column<any>[] = [
    {
      key: 'id', header: 'Transaction',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <CreditCard className="h-4 w-4 text-indigo-500" />
          </div>
          <div>
            <p className="text-xs font-mono text-gray-500">#{item.id?.slice(0, 8)}</p>
            <p className="text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'advertisements', header: 'Advertisement',
      render: (item) => (
        <span className="text-sm text-gray-700">{item.advertisements?.title || '—'}</span>
      ),
    },
    {
      key: 'amount', header: 'Amount', sortable: true,
      render: (item) => (
        <span className="font-medium text-gray-900">
          {item.currency || 'PKR'} {item.amount?.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'payment_method', header: 'Method', sortable: true,
      render: (item) => (
        <StatusBadge value={item.payment_method?.replace(/_/g, ' ') || '—'} />
      ),
    },
    {
      key: 'status', header: 'Status', sortable: true,
      render: (item) => <StatusBadge value={item.status} type="payment" />,
    },
    {
      key: 'transaction_id', header: 'Transaction ID',
      render: (item) => (
        <span className="text-xs font-mono text-gray-400">{item.transaction_id || '—'}</span>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Payment History"
        subtitle="View your payment records and transaction status"
      />
      <DataTable
        columns={columns}
        data={initialPayments}
        keyField="id"
        searchPlaceholder="Search payments..."
        emptyMessage="No payment records yet. Payments appear when you book advertisements."
      />
    </div>
  )
}