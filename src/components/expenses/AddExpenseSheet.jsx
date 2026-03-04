import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import AddExpenseForm from './AddExpenseForm'

export default function AddExpenseSheet({ open, onClose }) {
  const dragControls = useDragControls()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose()
            }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
          >
            <div
              className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-10 h-1 rounded-full bg-rose-gold-light/40" />
            </div>
            <div className="px-5 pb-8">
              <h2 className="font-heading text-xl font-bold text-rose-gold-dark mb-5">
                Add Expense
              </h2>
              <AddExpenseForm onSuccess={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
