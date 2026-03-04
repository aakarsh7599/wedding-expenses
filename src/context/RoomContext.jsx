import { createContext, useContext, useState, useEffect } from 'react'
import useExpenses from '../hooks/useExpenses'
import usePayers from '../hooks/usePayers'

const RoomContext = createContext(null)

export function RoomProvider({ children }) {
  const [roomCode, setRoomCode] = useState(
    () => localStorage.getItem('weddingRoomCode') || ''
  )

  useEffect(() => {
    if (roomCode) {
      localStorage.setItem('weddingRoomCode', roomCode)
    } else {
      localStorage.removeItem('weddingRoomCode')
    }
  }, [roomCode])

  const { expenses, loading, addExpense, removeExpense } = useExpenses(roomCode)
  const { payers, addPayer } = usePayers(roomCode)

  function leaveRoom() {
    setRoomCode('')
  }

  return (
    <RoomContext.Provider
      value={{
        roomCode,
        setRoomCode,
        expenses,
        loading,
        addExpense,
        removeExpense,
        payers,
        addPayer,
        leaveRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export function useRoomContext() {
  const ctx = useContext(RoomContext)
  if (!ctx) throw new Error('useRoomContext must be used within RoomProvider')
  return ctx
}
