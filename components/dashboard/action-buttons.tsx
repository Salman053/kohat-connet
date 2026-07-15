import Link from 'next/link'
import { Eye, Pencil, Trash2 } from 'lucide-react'

type ActionButtonsProps = {
  viewUrl?: string
  editUrl?: string
  onDelete?: () => void
  size?: 'sm' | 'md'
}

export default function ActionButtons({ viewUrl, editUrl, onDelete, size = 'sm' }: ActionButtonsProps) {
  const btnSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <div className="flex items-center gap-1">
      {viewUrl && (
        <Link
          href={viewUrl}
          className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-indigo-50 transition-colors"
          title="View"
        >
          <Eye className={btnSize} />
        </Link>
      )}
      {editUrl && (
        <Link
          href={editUrl}
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          title="Edit"
        >
          <Pencil className={btnSize} />
        </Link>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <Trash2 className={btnSize} />
        </button>
      )}
    </div>
  )
}