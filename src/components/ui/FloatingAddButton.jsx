import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function FloatingAddButton({ onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-20 right-5 w-14 h-14 bg-rose-gold text-white rounded-full shadow-lg shadow-rose-gold/30 flex items-center justify-center z-40"
    >
      <Plus className="w-6 h-6" />
    </motion.button>
  )
}
