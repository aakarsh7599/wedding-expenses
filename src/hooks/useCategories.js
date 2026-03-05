import { useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../config/firebase'

export default function useCategories(roomCode) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!roomCode) return
    const unsub = onSnapshot(doc(db, 'rooms', roomCode), (snap) => {
      if (snap.exists()) {
        setCategories(snap.data().categories || [])
      }
    })
    return unsub
  }, [roomCode])

  async function addCategory({ name, color, icon }) {
    const trimmed = name.trim()
    if (!trimmed) return
    if (categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      throw new Error('Category already exists')
    }
    await updateDoc(doc(db, 'rooms', roomCode), {
      categories: arrayUnion({ name: trimmed, color, icon }),
    })
  }

  return { categories, addCategory }
}
