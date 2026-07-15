'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/dashboard/toast'
import DataTable from '@/components/dashboard/data-table'
import type { Column } from '@/components/dashboard/data-table'
import StatusBadge from '@/components/dashboard/status-badge'
import { DollarSign, Image as ImageIcon, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Props = { initialPayments: any[] }

export default function AdminPaymentsTable({ initialPayments }: Props) {
  const [payments, setPayments] = useState(initialPayments)
  const [rejectModal, setRejectModal] = useState<{ id: string; amount: number; currency: string; transaction_id: string; email: string } | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const supabase = createClient()
  const { toast } = useToast()

  const refresh = useCallback(async () => {
    const { data } = await supabase
      .from('payments')
      .select('*, user:profiles!payments_user_id_fkey(full_name, business_name, email), advertisement:advertisements(title, ad_type)')
      .order('created_at', { ascending: false })
    if (data) setPayments(data)
  }, [supabase])

  const handleApprove = useCallback(async (id: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const res = await fetch(`/api/payments/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` }, body: JSON.stringify({ status: 'completed' }) })
    if (res.ok) { toast('Payment approved', 'success'); refresh() } else { toast('Failed to approve', 'error') }
  }, [supabase, toast, refresh])

  const handleReject = useCallback(async () => {
    if (!rejectModal || !rejectionReason.trim()) return
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const res = await fetch(`/api/payments/${rejectModal.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` }, body: JSON.stringify({ status: 'failed', rejection_reason: rejectionReason }) })
    if (res.ok) { toast('Payment rejected', 'success'); setRejectModal(null); setRejectionReason(''); refresh() } else { toast('Failed to reject', 'error') }
  }, [rejectModal, rejectionReason, supabase, toast, refresh])

  const label = (m: string) => ({ bank_transfer: 'Bank Transfer', jazzcash: 'JazzCash', easypaisa: 'EasyPaisa', cash: 'Cash Deposit' }[m] || m)

  const columns: Column<any>[] = [
    {
      key: 'amount', header: 'Payment', sortable: true,
      render: (item) => (
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">{item.amount?.toLocaleString()} {item.currency}</span>
          </div>
          <p className="text-xs text-gray-400">Ref: {item.transaction_id}</p>
          {item.advertisement && <p className="text-[10px] text-gray-400">Ad: {item.advertisement.title}</p>}
        </div>
      ),
    },
    {
      key: 'user', header: 'User',
      render: (item) => (
        <div>
          <p className="text-sm text-gray-900">{item.user?.business_name || item.user?.full_name || '—'}</p>
          <p className="text-xs text-gray-400">{item.user?.email}</p>
        </div>
      ),
    },
    {
      key: 'payment_method', header: 'Method',
      render: (item) => <span className="text-sm text-gray-500">{label(item.payment_method)}</span>,
    },
    {
      key: 'status', header: 'Status', sortable: true,
      render: (item) => <StatusBadge value={item.status} type="payment" />,
    },
    {
      key: 'created_at', header: 'Date', sortable: true,
      render: (item) => <span className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>,
    },
    {
      key: 'id', header: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          {item.receipt_url && (
            <button onClick={() => window.open(item.receipt_url, '_blank')}
              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50" title="View Receipt">
              <ImageIcon className="h-4 w-4" />
            </button>
          )}
          {item.status === 'under_review' && (
            <>
              <button onClick={() => handleApprove(item.id)}
                className="p-1.5 rounded-lg text-green-600 hover:bg-green-50" title="Approve">
                <DollarSign className="h-4 w-4" />
              </button>
              <button onClick={() => setRejectModal({ id: item.id, amount: item.amount, currency: item.currency, transaction_id: item.transaction_id, email: item.user?.email })}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50" title="Reject">
                <X className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
        data={payments}
        keyField="id"
        searchPlaceholder="Search payments..."
        emptyMessage="No payments found"
      />

      {rejectModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reject Payment</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-600 space-y-1">
              <p><strong>Amount:</strong> {rejectModal.amount.toLocaleString()} {rejectModal.currency}</p>
              <p><strong>Transaction:</strong> {rejectModal.transaction_id}</p>
              <p><strong>User:</strong> {rejectModal.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rejection Reason *</label>
              <Textarea required value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3} placeholder="Explain why this payment is being rejected" />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => { setRejectModal(null); setRejectionReason('') }}>Cancel</Button>
              <Button type="button" onClick={handleReject} className="bg-red-600 hover:bg-red-700">Reject Payment</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}