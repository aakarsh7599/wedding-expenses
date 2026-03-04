import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'

export default function useExpenses(roomCode) {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!roomCode) return
    const q = query(
      collection(db, 'rooms', roomCode, 'expenses'),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, (snap) => {
      setExpenses(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      )
      setLoading(false)
    })
    return unsub
  }, [roomCode])

  async function addExpense({ category, name, amount, paidBy }) {
    await addDoc(collection(db, 'rooms', roomCode, 'expenses'), {
      category,
      name,
      amount: Number(amount),
      paidBy,
      createdAt: serverTimestamp(),
    })
  }

  async function removeExpense(expenseId) {
    await deleteDoc(doc(db, 'rooms', roomCode, 'expenses', expenseId))
  }

  return { expenses, loading, addExpense, removeExpense }
}
