import { useMemo } from 'react'
import { useRoomContext } from '../../context/RoomContext'
import categories from '../../config/categories'
import formatCurrency from '../../utils/formatCurrency'

export default function QuickStats() {
  const { expenses } = useRoomContext()

  const stats = useMemo(() => {
    const map = {}
    for (const exp of expenses) {
      map[exp.category] = (map[exp.category] || 0) + exp.amount
    }
    return categories
      .map((c) => ({
        name: c.name,
        color: c.color,
        icon: c.icon,
        amount: map[c.name] || 0,
      }))
      .filter((s) => s.amount > 0)
  }, [expenses])

  if (stats.length === 0) return null

  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold text-rose-gold-dark uppercase tracking-wider mb-2 px-1">
        By Category
      </h3>
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.name}
              className="flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-sm shadow-rose-200/20 min-w-[120px]"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                <span className="text-[11px] text-rose-gold-light truncate">{s.name}</span>
              </div>
              <p className="text-sm font-bold text-rose-gold-dark font-heading">
                {formatCurrency(s.amount)}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
