import { Badge } from '@/components/ui/badge'

const statusColorMap: Record<string, Record<string, string>> = {
  listing: {
    approved: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
    expired: 'bg-gray-100 text-gray-600 border-gray-200',
  },
  ad: {
    active: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    paused: 'bg-blue-100 text-blue-700 border-blue-200',
    completed: 'bg-gray-100 text-gray-600 border-gray-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  },
  payment: {
    completed: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    under_review: 'bg-blue-100 text-blue-700 border-blue-200',
    failed: 'bg-red-100 text-red-700 border-red-200',
    refunded: 'bg-gray-100 text-gray-600 border-gray-200',
  },
  default: {
    true: 'bg-green-100 text-green-700 border-green-200',
    false: 'bg-gray-100 text-gray-600 border-gray-200',
    active: 'bg-green-100 text-green-700 border-green-200',
    inactive: 'bg-gray-100 text-gray-600 border-gray-200',
  },
}

type StatusType = 'listing' | 'ad' | 'payment' | 'default'

type StatusBadgeProps = {
  value: string | boolean | undefined | null
  type?: StatusType
  className?: string
}

export default function StatusBadge({ value, type = 'default', className = '' }: StatusBadgeProps) {
  const map = statusColorMap[type] || statusColorMap.default
  const stringVal = String(value ?? '').toLowerCase()
  const colorClass = map[stringVal] || 'bg-gray-100 text-gray-600 border-gray-200'

  return (
    <Badge className={`border capitalize ${colorClass} ${className}`}>
      {stringVal || 'unknown'}
    </Badge>
  )
}

export { statusColorMap }
