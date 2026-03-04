import { useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../config/firebase'

export default function usePayers(roomCode) {
  const [payers, setPayers] = useState([])

  useEffect(() => {
    if (!roomCode) return
    const unsub = onSnapshot(doc(db, 'rooms', roomCode), (snap) => {
      if (snap.exists()) {
        setPayers(snap.data().payers || [])
      }
    })
    return unsub
  }, [roomCode])

  async function addPayer(name) {
    const trimmed = name.trim()
    if (!trimmed) return
    await updateDoc(doc(db, 'rooms', roomCode), {
      payers: arrayUnion(trimmed),
    })
  }

  return { payers, addPayer }
}
