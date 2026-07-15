import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  name: string
  value: number
  icon: LucideIcon
  color: string
  href: string
  subtitle?: string
}

export default function StatCard({ name, value, icon: Icon, color, href, subtitle }: StatCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
              {name}
            </p>
            <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
            {subtitle && (
              <p className="text-xs text-gray-400">{subtitle}</p>
            )}
          </div>
          <div className={`${color} p-3.5 rounded-xl shadow-sm`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </Link>
  )
}