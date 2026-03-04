import { RoomProvider, useRoomContext } from './context/RoomContext'
import RoomGate from './components/room/RoomGate'
import AppShell from './components/layout/AppShell'

function AppContent() {
  const { roomCode } = useRoomContext()
  return roomCode ? <AppShell /> : <RoomGate />
}

export default function App() {
  return (
    <RoomProvider>
      <AppContent />
    </RoomProvider>
  )
}
