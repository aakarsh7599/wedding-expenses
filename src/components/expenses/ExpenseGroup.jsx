import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ExpenseItem from './ExpenseItem'
import formatCurrency from '../../utils/formatCurrency'

export default function ExpenseGroup({ label, expenses, color, onDelete }) {
  const [open, setOpen] = useState(true)
  const subtotal = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-1 py-2 sticky top-0 bg-cream z-10"
      >
        <div className="flex items-center gap-2">
          {color && (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
          <span className="text-sm font-semibold text-rose-gold-dark">
            {label}
          </span>
          <span className="text-xs text-rose-gold-light bg-rose-gold/10 px-2 py-0.5 rounded-full">
            {expenses.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-rose-gold-dark">
            {formatCurrency(subtotal)}
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown className="w-4 h-4 text-rose-gold-light" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {expenses.map((expense, i) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ExpenseItem expense={expense} onDelete={onDelete} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
