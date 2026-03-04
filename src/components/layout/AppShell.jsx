import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import BottomNav from './BottomNav'
import FloatingAddButton from '../ui/FloatingAddButton'
import Dashboard from '../dashboard/Dashboard'
import ExpenseList from '../expenses/ExpenseList'
import AddExpenseSheet from '../expenses/AddExpenseSheet'
import { useRoomContext } from '../../context/RoomContext'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function AppShell() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const { loading } = useRoomContext()

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-cream pb-16">
      <Header />
      <main className="px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Dashboard />
            </motion.div>
          ) : (
            <motion.div
              key="expenses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ExpenseList />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <FloatingAddButton onClick={() => setIsAddSheetOpen(true)} />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <AddExpenseSheet
        open={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
      />
    </div>
  )
}
