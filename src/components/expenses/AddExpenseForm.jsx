import { useState } from 'react'
import { Plus } from 'lucide-react'
import categories from '../../config/categories'
import { useRoomContext } from '../../context/RoomContext'

export default function AddExpenseForm({ onSuccess }) {
  const { addExpense, payers, addPayer } = useRoomContext()
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const [newPayer, setNewPayer] = useState('')
  const [showNewPayer, setShowNewPayer] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!category || !name.trim() || !amount || !paidBy) {
      setError('Please fill in all fields')
      return
    }
    if (Number(amount) <= 0) {
      setError('Amount must be greater than 0')
      return
    }

    setSubmitting(true)
    try {
      await addExpense({
        category,
        name: name.trim(),
        amount: Number(amount),
        paidBy,
      })
      onSuccess()
    } catch {
      setError('Failed to add expense')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleAddPayer() {
    if (!newPayer.trim()) return
    await addPayer(newPayer.trim())
    setPaidBy(newPayer.trim())
    setNewPayer('')
    setShowNewPayer(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Category */}
      <div>
        <label className="text-xs font-semibold text-rose-gold-dark uppercase tracking-wider mb-2 block">
          Category
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            const selected = category === cat.name
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setCategory(cat.name)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                  selected
                    ? 'text-white shadow-md'
                    : 'bg-cream-dark text-rose-gold-dark'
                }`}
                style={selected ? { backgroundColor: cat.color } : {}}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{cat.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="text-xs font-semibold text-rose-gold-dark uppercase tracking-wider mb-2 block">
          Description
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Photographer"
          className="w-full bg-cream-dark rounded-xl px-4 py-3 text-rose-gold-dark placeholder:text-rose-gold-light/50 focus:outline-none focus:ring-2 focus:ring-rose-gold/30"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="text-xs font-semibold text-rose-gold-dark uppercase tracking-wider mb-2 block">
          Amount (INR)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-gold-light font-medium">
            ₹
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full bg-cream-dark rounded-xl pl-8 pr-4 py-3 text-rose-gold-dark font-semibold text-lg placeholder:text-rose-gold-light/50 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>
      </div>

      {/* Paid By */}
      <div>
        <label className="text-xs font-semibold text-rose-gold-dark uppercase tracking-wider mb-2 block">
          Paid By
        </label>
        <div className="flex flex-wrap gap-2">
          {payers.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPaidBy(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                paidBy === p
                  ? 'bg-rose-gold text-white shadow-md'
                  : 'bg-cream-dark text-rose-gold-dark'
              }`}
            >
              {p}
            </button>
          ))}
          {showNewPayer ? (
            <div className="flex gap-1.5">
              <input
                type="text"
                value={newPayer}
                onChange={(e) => setNewPayer(e.target.value)}
                placeholder="Name"
                autoFocus
                className="w-24 bg-cream-dark rounded-xl px-3 py-2 text-sm text-rose-gold-dark placeholder:text-rose-gold-light/50 focus:outline-none focus:ring-2 focus:ring-rose-gold/30"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddPayer()
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddPayer}
                className="bg-rose-gold text-white p-2 rounded-xl active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowNewPayer(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium bg-cream-dark text-rose-gold border border-dashed border-rose-gold-light/40 active:scale-95 transition-transform"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-rose-gold text-white font-semibold py-3.5 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
      >
        {submitting ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  )
}
