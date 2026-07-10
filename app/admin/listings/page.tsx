'use client'

import { useState, useEffect } from 'react'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Star,
  Calendar,
  Building2
} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const supabase = createSupabaseClient()

type ListingStatus = 'pending' | 'approved' | 'rejected' | 'expired'

interface Listing {
  id: string
  title: string
  description: string | null
  status: ListingStatus
  is_featured: boolean
  is_verified: boolean
  views: number
  rating: number
  review_count: number
  created_at: string
  category: {
    name: string
  } | null
  user: {
    email: string
    full_name: string | null
  } | null
}

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ListingStatus | 'all'>('all')

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        category:categories(name),
        user:profiles(email, full_name)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching listings:', error)
    } else {
      setListings(data || [])
    }
    setLoading(false)
  }

  const handleStatusChange = async (listingId: string, newStatus: ListingStatus) => {
    const { error } = await supabase
      .from('listings')
      .update({ status: newStatus })
      .eq('id', listingId)

    if (!error) {
      fetchListings()
    }
  }

  const handleFeaturedToggle = async (listingId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('listings')
      .update({ is_featured: !currentStatus })
      .eq('id', listingId)

    if (!error) {
      fetchListings()
    }
  }

  const handleVerifiedToggle = async (listingId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('listings')
      .update({ is_verified: !currentStatus })
      .eq('id', listingId)

    if (!error) {
      fetchListings()
    }
  }

  const filteredListings = listings.filter(listing => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.description && listing.description.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeColor = (status: ListingStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Listing Management</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
               
              <Input
                type="text"
                placeholder="Search listings..."
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
              onValueChange={(v) => setStatusFilter(v as ListingStatus | 'all')}
            >
              <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading listings...</div>
        ) : filteredListings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No listings found</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        {listing.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {listing.description}
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          {listing.is_featured && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                          {listing.is_verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {listing.category?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {listing.user?.full_name || listing.user?.email || 'Unknown'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadgeColor(listing.status)}`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{listing.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{listing.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Building2 className="h-4 w-4" />
                        <span>{listing.review_count}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {listing.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(listing.id, 'approved')}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(listing.id, 'rejected')}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleFeaturedToggle(listing.id, listing.is_featured)}
                        className={`p-1 rounded ${listing.is_featured ? 'text-yellow-600 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'}`}
                        title="Toggle Featured"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleVerifiedToggle(listing.id, listing.is_verified)}
                        className={`p-1 rounded ${listing.is_verified ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                        title="Toggle Verified"
                      >
                        <Check className="h-4 w-4" />
                      </button>
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
