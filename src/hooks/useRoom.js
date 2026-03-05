import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import generateRoomCode from '../utils/generateRoomCode'

export default function useRoom() {
  async function createRoom() {
    const code = generateRoomCode()
    await setDoc(doc(db, 'rooms', code), {
      createdAt: serverTimestamp(),
      payers: [],
      categories: [],
    })
    return code
  }

  async function joinRoom(code) {
    const upper = code.toUpperCase().trim()
    if (upper.length !== 6) throw new Error('Room code must be 6 characters')
    const snap = await getDoc(doc(db, 'rooms', upper))
    if (!snap.exists()) throw new Error('Room not found')
    return upper
  }

  return { createRoom, joinRoom }
}
