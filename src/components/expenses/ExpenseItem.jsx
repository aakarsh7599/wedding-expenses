import { useState } from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import categories from '../../config/categories'
import formatCurrency from '../../utils/formatCurrency'

export default function ExpenseItem({ expense, onDelete }) {
  const x = useMotionValue(0)
  const controls = useAnimation()
  const bgOpacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0])
  const [dragging, setDragging] = useState(false)

  const cat = categories.find((c) => c.name === expense.category)
  const Icon = cat?.icon

  function handleDragEnd() {
    setDragging(false)
    if (x.get() < -80) {
      onDelete(expense)
    } else {
      controls.start({ x: 0 })
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl mb-2">
      {/* Delete background */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-red-500 flex items-center justify-end pr-5 rounded-xl"
      >
        <Trash2 className="w-5 h-5 text-white" />
      </motion.div>

      {/* Card */}
      <motion.div
        style={{ x }}
        animate={controls}
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setDragging(true)}
        onDragEnd={handleDragEnd}
        className="relative bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3 cursor-grab active:cursor-grabbing"
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: cat ? `${cat.color}20` : '#f5ebe0' }}
        >
          {Icon && <Icon className="w-4.5 h-4.5" style={{ color: cat.color }} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-rose-gold-dark truncate">
            {expense.name}
          </p>
          <p className="text-xs text-rose-gold-light">{expense.paidBy}</p>
        </div>
        <p className="text-sm font-semibold text-rose-gold-dark whitespace-nowrap">
          {formatCurrency(expense.amount)}
        </p>
      </motion.div>
    </div>
  )
}
