'use client'

import { useState, useEffect } from 'react'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { 
  Megaphone, 
  Calendar, 
  Image as ImageIcon,
  Globe,
  CreditCard,
  Check,
  DollarSign
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const supabase = createSupabaseClient()

interface AdPackage {
  id: string
  name: string
  description: string
  ad_type: string
  duration_days: number
  price: number
  features: any
}

export default function NewAdPage() {
  const router = useRouter()
  const [packages, setPackages] = useState<AdPackage[]>([])
  const [selectedPackage, setSelectedPackage] = useState<AdPackage | null>(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    redirect_url: '',
    start_date: '',
    end_date: '',
    payment_method: '',
    transaction_id: '',
    receipt_url: '',
    notes: ''
  })

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from('ad_packages')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true })

    if (error) {
      console.error('Error fetching packages:', error)
    } else {
      setPackages(data || [])
    }
  }

  const handlePackageSelect = (pkg: AdPackage) => {
    setSelectedPackage(pkg)
    
    // Auto-calculate end date based on start date
    if (formData.start_date) {
      const startDate = new Date(formData.start_date)
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + pkg.duration_days)
      setFormData({
        ...formData,
        end_date: endDate.toISOString().split('T')[0]
      })
    }
    
    setStep(2)
  }

  const handleStartDateChange = (date: string) => {
    setFormData({ ...formData, start_date: date })
    
    if (selectedPackage) {
      const startDate = new Date(date)
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + selectedPackage.duration_days)
      setFormData({
        ...formData,
        start_date: date,
        end_date: endDate.toISOString().split('T')[0]
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPackage) return

    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth/signin')
        return
      }

      // Create advertisement with pending status
      const adResponse = await fetch('/api/advertisements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
          ad_type: selectedPackage.ad_type,
          redirect_url: formData.redirect_url,
          start_date: formData.start_date,
          end_date: formData.end_date
        })
      })

      if (!adResponse.ok) {
        const error = await adResponse.json()
        throw new Error(error.error || 'Failed to create advertisement')
      }

      const adData = await adResponse.json()

      // Create payment record
      const paymentResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          advertisement_id: adData.id,
          amount: selectedPackage.price,
          payment_method: formData.payment_method,
          transaction_id: formData.transaction_id,
          receipt_url: formData.receipt_url,
          notes: formData.notes
        })
      })

      if (!paymentResponse.ok) {
        const error = await paymentResponse.json()
        throw new Error(error.error || 'Failed to submit payment')
      }

      alert('Advertisement submitted successfully! Your payment is under review. We will activate your ad once payment is verified.')
      router.push('/dashboard/advertisements')
    } catch (error: any) {
      console.error('Error creating advertisement:', error)
      alert(error.message || 'Failed to create advertisement')
    } finally {
      setLoading(false)
    }
  }

  const getAdTypeLabel = (type: string) => {
    switch (type) {
      case 'banner': return 'Banner Ad'
      case 'sidebar': return 'Sidebar Ad'
      case 'featured': return 'Featured Listing'
      case 'sponsored': return 'Sponsored Post'
      default: return type
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Advertisement</h1>
        <p className="text-gray-600 mt-2">Promote your business with targeted advertising</p>
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select a Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-indigo-500 cursor-pointer transition-colors"
                onClick={() => handlePackageSelect(pkg)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-indigo-600">
                    {getAdTypeLabel(pkg.ad_type)}
                  </span>
                  <Megaphone className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-gray-900">Rs. {pkg.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 ml-1">/ {pkg.duration_days} days</span>
                </div>
                <div className="space-y-2">
                  {pkg.features && Object.entries(pkg.features).map(([key, value]) => (
                    <div key={key} className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: {String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && selectedPackage && (
        <div className="max-w-2xl">
          <Button
            onClick={() => setStep(1)}
            variant="link"
            className="mb-4"
          >
            ← Back to packages
          </Button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Package</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{selectedPackage.name}</p>
                <p className="text-sm text-gray-600">{getAdTypeLabel(selectedPackage.ad_type)}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">Rs. {selectedPackage.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{selectedPackage.duration_days} days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ad Title *
                </label>
                <Input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter ad title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Describe your advertisement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Image URL *
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="url"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/ad-image.jpg"
                  />
                </div>
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded-md"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Redirect URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="url"
                    required
                    value={formData.redirect_url}
                    onChange={(e) => setFormData({ ...formData, redirect_url: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="date"
                      required
                      value={formData.start_date}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="date"
                      required
                      value={formData.end_date}
                      readOnly
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Auto-calculated based on package duration
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span>Payment Information</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Payment Method *
                    </label>
                    <Select
                      value={formData.payment_method}
                      onValueChange={(v) => setFormData({ ...formData, payment_method: v ?? '' })}
                    >
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="jazzcash">JazzCash</SelectItem>
                        <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                        <SelectItem value="cash">Cash Deposit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Transaction ID / Reference Number *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.transaction_id || ''}
                      onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter transaction ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Payment Receipt *
                    </label>
                    <div className="space-y-3">
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="url"
                          required
                          value={formData.receipt_url || ''}
                          onChange={(e) => setFormData({ ...formData, receipt_url: e.target.value })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter receipt image URL"
                        />
                      </div>
                      {formData.receipt_url && (
                        <img
                          src={formData.receipt_url}
                          alt="Receipt preview"
                          className="w-full h-48 object-cover rounded-md border border-gray-200"
                        />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload your payment receipt to any image hosting service and paste the URL here
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={2}
                      placeholder="Any additional information about your payment"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Package Price</span>
                  <span className="font-medium text-gray-900">Rs. {selectedPackage.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">Rs. {selectedPackage.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  variant="default"
                  className="flex items-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>{loading ? 'Submitting...' : 'Submit for Review'}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
