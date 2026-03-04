import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Crown, User } from 'lucide-react'
import { useRoomContext } from '../../context/RoomContext'
import formatCurrency from '../../utils/formatCurrency'

export default function SummaryCards() {
  const { expenses } = useRoomContext()

  const { total, topCategory, topPayer } = useMemo(() => {
    let total = 0
    const catMap = {}
    const payerMap = {}

    for (const exp of expenses) {
      total += exp.amount
      catMap[exp.category] = (catMap[exp.category] || 0) + exp.amount
      payerMap[exp.paidBy] = (payerMap[exp.paidBy] || 0) + exp.amount
    }

    const topCategory = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0]
    const topPayer = Object.entries(payerMap).sort((a, b) => b[1] - a[1])[0]

    return {
      total,
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
      topPayer: topPayer ? { name: topPayer[0], amount: topPayer[1] } : null,
    }
  }, [expenses])

  const cards = [
    {
      label: 'Total Spent',
      value: formatCurrency(total),
      sub: `${expenses.length} expense${expenses.length !== 1 ? 's' : ''}`,
      icon: TrendingUp,
      color: 'text-rose-gold',
      bg: 'bg-rose-gold/10',
    },
    topCategory && {
      label: 'Top Category',
      value: topCategory.name,
      sub: formatCurrency(topCategory.amount),
      icon: Crown,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
    topPayer && {
      label: 'Top Spender',
      value: topPayer.name,
      sub: formatCurrency(topPayer.amount),
      icon: User,
      color: 'text-rose-gold-dark',
      bg: 'bg-rose-gold-light/20',
    },
  ].filter(Boolean)

  return (
    <div className="grid grid-cols-1 gap-3 mb-4">
      {cards.map((card, i) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm shadow-rose-200/20 flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg}`}>
              <Icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-[11px] text-rose-gold-light font-medium uppercase tracking-wider">
                {card.label}
              </p>
              <p className="text-base font-bold text-rose-gold-dark font-heading">
                {card.value}
              </p>
              <p className="text-xs text-rose-gold-light">{card.sub}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
