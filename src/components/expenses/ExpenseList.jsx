import { useState, useMemo, useCallback } from 'react'
import { useRoomContext } from '../../context/RoomContext'
import ExpenseGroup from './ExpenseGroup'
import EmptyState from '../ui/EmptyState'
import ConfirmDialog from '../ui/ConfirmDialog'
import { getPayerColor } from '../../utils/colorPalette'

export default function ExpenseList() {
  const { expenses, removeExpense, payers, categories } = useRoomContext()
  const [groupBy, setGroupBy] = useState('category')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const grouped = useMemo(() => {
    const map = {}
    for (const exp of expenses) {
      const key = groupBy === 'category' ? exp.category : exp.paidBy
      if (!map[key]) map[key] = []
      map[key].push(exp)
    }
    return map
  }, [expenses, groupBy])

  const getColor = useCallback(
    (key) => {
      if (groupBy === 'category') {
        return categories.find((c) => c.name === key)?.color
      }
      const idx = payers.indexOf(key)
      return getPayerColor(idx >= 0 ? idx : 0)
    },
    [groupBy, payers, categories]
  )

  async function handleConfirmDelete() {
    if (deleteTarget) {
      await removeExpense(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  if (expenses.length === 0) return <EmptyState />

  return (
    <div className="pb-4">
      {/* Group By Toggle */}
      <div className="flex items-center gap-1 bg-cream-dark rounded-xl p-1 mb-4">
        {['category', 'paidBy'].map((opt) => (
          <button
            key={opt}
            onClick={() => setGroupBy(opt)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
              groupBy === opt
                ? 'bg-white text-rose-gold-dark shadow-sm'
                : 'text-rose-gold-light'
            }`}
          >
            {opt === 'category' ? 'By Category' : 'By Paid By'}
          </button>
        ))}
      </div>

      {/* Groups */}
      {Object.entries(grouped).map(([key, items]) => (
        <ExpenseGroup
          key={key}
          label={key}
          expenses={items}
          color={getColor(key)}
          onDelete={setDeleteTarget}
        />
      ))}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Expense"
        message={
          deleteTarget
            ? `Remove "${deleteTarget.name}" for ₹${deleteTarget.amount?.toLocaleString('en-IN')}?`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
