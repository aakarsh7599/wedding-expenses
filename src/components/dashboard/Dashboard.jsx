import { useRoomContext } from '../../context/RoomContext'
import SummaryCards from './SummaryCards'
import QuickStats from './QuickStats'
import ChartSection from '../charts/ChartSection'
import EmptyState from '../ui/EmptyState'

export default function Dashboard() {
  const { expenses } = useRoomContext()

  if (expenses.length === 0) {
    return <EmptyState message="No expenses to show" />
  }

  return (
    <div className="pb-4">
      <SummaryCards />
      <QuickStats />
      <ChartSection />
    </div>
  )
}
