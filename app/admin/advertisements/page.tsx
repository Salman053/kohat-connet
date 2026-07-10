'use client'

import { useState, useEffect } from 'react'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  MousePointer2,
  Calendar,
  DollarSign,
  Megaphone
} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const supabase = createSupabaseClient()

type AdStatus = 'pending' | 'active' | 'paused' | 'completed' | 'cancelled'
type AdType = 'banner' | 'sidebar' | 'featured' | 'sponsored'

interface Advertisement {
  id: string
  title: string
  description: string | null
  image_url: string | null
  ad_type: AdType
  ad_status: AdStatus
  redirect_url: string | null
  start_date: string
  end_date: string
  impressions: number
  clicks: number
  created_at: string
  user: {
    email: string
    full_name: string | null
    business_name: string | null
  } | null
}

export default function AdminAdvertisementsPage() {
  const [ads, setAds] = useState<Advertisement[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<AdType | 'all'>('all')

  useEffect(() => {
    fetchAds()
  }, [])

  const fetchAds = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('advertisements')
      .select(`
        *,
        user:profiles(email, full_name, business_name)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching ads:', error)
    } else {
      setAds(data || [])
    }
    setLoading(false)
  }

  const handleStatusChange = async (adId: string, newStatus: AdStatus) => {
    const { error } = await supabase
      .from('advertisements')
      .update({ ad_status: newStatus })
      .eq('id', adId)

    if (!error) {
      fetchAds()
    }
  }

  const filteredAds = ads.filter(ad => {
    const matchesSearch = 
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ad.description && ad.description.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || ad.ad_status === statusFilter
    const matchesType = typeFilter === 'all' || ad.ad_type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadgeColor = (status: AdStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeBadgeColor = (type: AdType) => {
    switch (type) {
      case 'banner':
        return 'bg-purple-100 text-purple-800'
      case 'sidebar':
        return 'bg-blue-100 text-blue-800'
      case 'featured':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  const calculateCTR = (impressions: number, clicks: number) => {
    if (impressions === 0) return 0
    return ((clicks / impressions) * 100).toFixed(2)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Advertisement Management</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
               
              <Input
                type="text"
                placeholder="Search advertisements..."
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
              onValueChange={(v) => setStatusFilter(v as AdStatus | 'all')}
            >
              <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={typeFilter}
              onValueChange={(v) => setTypeFilter(v as AdType | 'all')}
            >
              <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="banner">Banner</SelectItem>
                <SelectItem value="sidebar">Sidebar</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="sponsored">Sponsored</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Ads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading advertisements...</div>
        ) : filteredAds.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No advertisements found</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Advertisement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Advertiser
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      {ad.image_url && (
                        <img 
                          src={ad.image_url} 
                          alt={ad.title}
                          className="h-16 w-24 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                        {ad.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {ad.description}
                          </div>
                        )}
                        {ad.redirect_url && (
                          <div className="text-xs text-blue-600 truncate max-w-xs">
                            {ad.redirect_url}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeBadgeColor(ad.ad_type)}`}>
                      {ad.ad_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {ad.user?.business_name || ad.user?.full_name || ad.user?.email || 'Unknown'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(ad.start_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(ad.end_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Eye className="h-4 w-4" />
                        <span>{ad.impressions} views</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MousePointer2 className="h-4 w-4" />
                        <span>{ad.clicks} clicks</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        CTR: {calculateCTR(ad.impressions, ad.clicks)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadgeColor(ad.ad_status)}`}>
                      {ad.ad_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {ad.ad_status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(ad.id, 'active')}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(ad.id, 'cancelled')}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      {ad.ad_status === 'active' && (
                        <button
                          onClick={() => handleStatusChange(ad.id, 'paused')}
                          className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
                          title="Pause"
                        >
                          <Megaphone className="h-4 w-4" />
                        </button>
                      )}
                      {ad.ad_status === 'paused' && (
                        <button
                          onClick={() => handleStatusChange(ad.id, 'active')}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Resume"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
