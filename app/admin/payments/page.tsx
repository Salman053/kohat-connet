'use client'

import { useState, useEffect } from 'react'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { 
  Search, 
  Filter, 
  Check, 
  X, 
  DollarSign,
  Calendar,
  Image as ImageIcon,
  FileText,
  Clock,
  AlertCircle
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const supabase = createSupabaseClient()

type PaymentStatus = 'pending' | 'under_review' | 'completed' | 'failed' | 'refunded'

interface Payment {
  id: string
  amount: number
  currency: string
  status: PaymentStatus
  payment_method: string
  transaction_id: string
  receipt_url: string | null
  notes: string | null
  created_at: string
  reviewed_at: string | null
  rejection_reason: string | null
  user: {
    full_name: string | null
    business_name: string | null
    email: string
  } | null
  advertisement: {
    title: string
    ad_type: string
  } | null
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all')
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        user:profiles!payments_user_id_fkey(full_name, business_name, email),
        advertisement:advertisements(title, ad_type)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching payments:', error)
    } else {
      setPayments(data || [])
    }
    setLoading(false)
  }

  const handleApprove = async (paymentId: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const response = await fetch(`/api/payments/${paymentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ status: 'completed' })
    })

    if (response.ok) {
      fetchPayments()
    }
  }

  const handleReject = async () => {
    if (!selectedPayment || !rejectionReason.trim()) return

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const response = await fetch(`/api/payments/${selectedPayment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ 
        status: 'failed',
        rejection_reason: rejectionReason 
      })
    })

    if (response.ok) {
      setShowModal(false)
      setRejectionReason('')
      setSelectedPayment(null)
      fetchPayments()
    }
  }

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.user?.email && payment.user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (payment.user?.full_name && payment.user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (payment.user?.business_name && payment.user.business_name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeColor = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'bank_transfer': return 'Bank Transfer'
      case 'jazzcash': return 'JazzCash'
      case 'easypaisa': return 'EasyPaisa'
      case 'cash': return 'Cash Deposit'
      default: return method
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
               
              <Input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as PaymentStatus | 'all')}
            >
              <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading payments...</div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No payments found</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {payment.amount.toLocaleString()} {payment.currency}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Ref: {payment.transaction_id}
                      </div>
                      {payment.advertisement && (
                        <div className="text-xs text-gray-400">
                          Ad: {payment.advertisement.title}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        {payment.user?.business_name || payment.user?.full_name || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-500">{payment.user?.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getPaymentMethodLabel(payment.payment_method)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadgeColor(payment.status)}`}>
                      {payment.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {payment.receipt_url && (
                        <button
                          onClick={() => payment.receipt_url && window.open(payment.receipt_url, '_blank')}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="View Receipt"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </button>
                      )}
                      {payment.status === 'under_review' && (
                        <>
                          <button
                            onClick={() => handleApprove(payment.id)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPayment(payment)
                              setShowModal(true)
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Reject Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span>Reject Payment</span>
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">Amount: {selectedPayment.amount.toLocaleString()} {selectedPayment.currency}</div>
                    <div>Transaction ID: {selectedPayment.transaction_id}</div>
                    <div>User: {selectedPayment.user?.email}</div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Rejection Reason *
                  </label>
                  <Textarea
                    required
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    placeholder="Explain why this payment is being rejected"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  onClick={() => {
                    setShowModal(false)
                    setRejectionReason('')
                    setSelectedPayment(null)
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
