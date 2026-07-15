'use client'

import { useState, useEffect } from 'react'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Megaphone, Calendar, CreditCard, Banknote, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from '@/components/dashboard/toast'
import ImageUpload from '@/components/dashboard/image-upload'
import { useAuth } from '@/components/auth/auth-context'
import PageHeader from '@/components/dashboard/page-header'

const supabase = createSupabaseClient()

interface AdPackage {
  id: string
  name: string
  description: string
  ad_type: string
  duration_days: number
  price: number
  features: Record<string, unknown>
}

export default function NewAdPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [packages, setPackages] = useState<AdPackage[]>([])
  const [selectedPkg, setSelectedPkg] = useState<AdPackage | null>(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    title: '', description: '', image_url: '', redirect_url: '',
    start_date: '', end_date: '',
  })

  const [payment, setPayment] = useState({
    payment_method: '', transaction_id: '', receipt_url: '', notes: '',
  })

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('ad_packages').select('*').eq('is_active', true)
      if (data) setPackages(data)
    }
    fetch()
  }, [])

  const selectPackage = (pkg: AdPackage) => {
    setSelectedPkg(pkg)
    const start = new Date()
    const end = new Date(start)
    end.setDate(end.getDate() + pkg.duration_days)
    setFormData(prev => ({
      ...prev,
      start_date: start.toISOString().slice(0, 10),
      end_date: end.toISOString().slice(0, 10),
    }))
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPkg) return
    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth/signin'); return }

      const adRes = await fetch('/api/advertisements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
          ad_type: selectedPkg.ad_type,
          redirect_url: formData.redirect_url,
          start_date: new Date(formData.start_date).toISOString(),
          end_date: new Date(formData.end_date).toISOString(),
        })
      })

      if (!adRes.ok) {
        const err = await adRes.json()
        throw new Error(err.error || 'Failed to create advertisement')
      }

      const adData = await adRes.json()

      const payRes = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({
          advertisement_id: adData.id || adData.advertisement?.id,
          amount: selectedPkg.price,
          currency: 'PKR',
          payment_method: payment.payment_method,
          transaction_id: payment.transaction_id || undefined,
          receipt_url: payment.receipt_url || undefined,
          notes: payment.notes || undefined,
        })
      })

      if (!payRes.ok) {
        const err = await payRes.json()
        throw new Error(err.error || 'Failed to process payment')
      }

      toast('Advertisement booked successfully!', 'success')
      router.push('/dashboard/advertisements')
    } catch (error: unknown) {
      toast(error instanceof Error ? error.message : 'Failed to book advertisement', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader title="Book Advertisement" subtitle="Promote your business with targeted advertising" />

      {step === 1 && (
        <div className="space-y-6">
          <p className="text-sm font-medium text-gray-600">Select an advertising package</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer"
                onClick={() => selectPackage(pkg)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full capitalize">{pkg.ad_type}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  PKR {pkg.price?.toLocaleString()}
                  <span className="text-sm font-normal text-gray-400"> / {pkg.duration_days} days</span>
                </p>
                <Button type="button" className="w-full bg-purple-600 hover:bg-purple-700">
                  Select Package
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && selectedPkg && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Ad Details</h2>
                <button onClick={() => setStep(1)} className="text-xs text-purple-600 hover:underline">Change package</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <div className="relative">
                    <Megaphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input type="text" required value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="pl-10" placeholder="Ad title" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3} placeholder="Describe your advertisement" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ad Image</label>
                  <ImageUpload folder="ads" onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Redirect URL</label>
                  <Input type="url" value={formData.redirect_url}
                    onChange={(e) => setFormData({ ...formData, redirect_url: e.target.value })}
                    placeholder="https://example.com/landing-page" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input type="date" required value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input type="date" required value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 mt-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-500" /> Payment Details
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Package: <strong>{selectedPkg.name}</strong> — PKR <strong>{selectedPkg.price?.toLocaleString()}</strong>
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
                      <Select
                        value={payment.payment_method}
                        onValueChange={(v) => setPayment({ ...payment, payment_method: v ?? '' })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="jazzcash">JazzCash</SelectItem>
                          <SelectItem value="easypaisa">Easypaisa</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                      <Input type="text" value={payment.transaction_id}
                        onChange={(e) => setPayment({ ...payment, transaction_id: e.target.value })}
                        placeholder="Transaction reference number" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Receipt</label>
                      <ImageUpload folder="receipts" onUpload={(url) => setPayment(prev => ({ ...prev, receipt_url: url }))} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <Textarea value={payment.notes}
                        onChange={(e) => setPayment({ ...payment, notes: e.target.value })}
                        rows={2} placeholder="Any additional notes" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                  <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                    {loading ? 'Submitting...' : 'Submit & Pay'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Package</span><span className="font-medium">{selectedPkg.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="font-medium capitalize">{selectedPkg.ad_type}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-medium">{selectedPkg.duration_days} days</span></div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-purple-600">PKR {selectedPkg.price?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}