import { useMemo } from 'react'
import { LogOut } from 'lucide-react'
import { useRoomContext } from '../../context/RoomContext'
import RoomCodeDisplay from '../room/RoomCodeDisplay'
import ExportMenu from '../ui/ExportMenu'
import formatCurrency from '../../utils/formatCurrency'

export default function Header() {
  const { expenses, leaveRoom } = useRoomContext()

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  )

  return (
    <header className="bg-gradient-to-b from-rose-50 to-cream px-4 pt-3 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-heading text-xl font-bold text-rose-gold-dark">
          Wedding Expenses
        </h1>
        <div className="flex items-center gap-2">
          <RoomCodeDisplay />
          <ExportMenu />
          <button
            onClick={leaveRoom}
            className="p-1.5 text-rose-gold-light hover:text-rose-gold-dark active:scale-95 transition"
            title="Leave room"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm shadow-rose-200/20">
        <p className="text-xs text-rose-gold-light font-medium uppercase tracking-wider mb-0.5">
          Total Expenses
        </p>
        <p className="font-heading text-2xl font-bold text-rose-gold-dark">
          {formatCurrency(total)}
        </p>
      </div>
    </header>
  )
}
