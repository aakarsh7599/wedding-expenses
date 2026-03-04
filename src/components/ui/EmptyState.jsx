import { motion } from 'framer-motion'
import { Receipt } from 'lucide-react'

export default function EmptyState({ message = 'No expenses yet' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-rose-gold/10 flex items-center justify-center mb-4">
        <Receipt className="w-8 h-8 text-rose-gold-light" />
      </div>
      <p className="text-rose-gold-light font-medium mb-1">{message}</p>
      <p className="text-rose-gold-light/60 text-sm">
        Tap the + button to add your first expense
      </p>
    </motion.div>
  )
}
