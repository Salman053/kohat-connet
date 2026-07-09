'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Search, Filter, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Report {
  id: string; reporter_id: string; reported_user_id: string | null
  reference_type: string; reference_id: string; reason: string
  description: string | null; is_resolved: boolean
  resolved_at: string | null; action_taken: string | null; created_at: string
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'resolved'>('all')

  useEffect(() => { fetchReports() }, [])

  const fetchReports = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('reports').select('*').order('created_at', { ascending: false })
    if (error) { console.error('Error:', error); setReports([]) } else { setReports(data || []) }
    setLoading(false)
  }

  const handleResolve = async (reportId: string) => {
    await supabase.from('reports').update({ is_resolved: true, resolved_at: new Date().toISOString(), action_taken: 'Reviewed by admin' }).eq('id', reportId)
    fetchReports()
  }

  const handleReopen = async (reportId: string) => {
    await supabase.from('reports').update({ is_resolved: false, resolved_at: null, action_taken: null }).eq('id', reportId)
    fetchReports()
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reference_type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'open' && !report.is_resolved) ||
      (statusFilter === 'resolved' && report.is_resolved)
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
            <Input placeholder="Search reports..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" />
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading reports...</div>
        ) : filteredReports.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No reports found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><div className="text-sm font-medium text-gray-900 capitalize">{report.reason.replace(/_/g, ' ')}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800 capitalize">{report.reference_type}</span>
                  </td>
                  <td className="px-6 py-4"><div className="text-sm text-gray-500 truncate max-w-xs">{report.description || 'No description'}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${report.is_resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {report.is_resolved ? 'Resolved' : 'Open'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.is_resolved ? (
                      <Button variant="ghost" size="icon-xs" onClick={() => handleReopen(report.id)} title="Reopen">
                        <X className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon-xs" onClick={() => handleResolve(report.id)} title="Resolve">
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
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
