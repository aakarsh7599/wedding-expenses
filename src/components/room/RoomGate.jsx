import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ArrowRight, Plus } from 'lucide-react'
import useRoom from '../../hooks/useRoom'
import { useRoomContext } from '../../context/RoomContext'

export default function RoomGate() {
  const { setRoomCode } = useRoomContext()
  const { createRoom, joinRoom } = useRoom()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [joining, setJoining] = useState(false)

  async function handleCreate() {
    setCreating(true)
    setError('')
    try {
      const newCode = await createRoom()
      setRoomCode(newCode)
    } catch (err) {
      console.error('Create room error:', err)
      setError(err.message || 'Failed to create room')
    } finally {
      setCreating(false)
    }
  }

  async function handleJoin(e) {
    e.preventDefault()
    setJoining(true)
    setError('')
    try {
      const validCode = await joinRoom(code)
      setRoomCode(validCode)
    } catch (err) {
      setError(err.message)
    } finally {
      setJoining(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-cream flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-gold/10 mb-4"
          >
            <Heart className="w-8 h-8 text-rose-gold" />
          </motion.div>
          <h1 className="font-heading text-3xl font-bold text-rose-gold-dark mb-2">
            Wedding Expenses
          </h1>
          <p className="text-rose-gold-light text-sm">
            Track and share wedding costs with family
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-rose-200/30">
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full flex items-center justify-center gap-2 bg-rose-gold text-white font-semibold py-3.5 rounded-xl active:scale-95 transition-transform disabled:opacity-50 mb-6"
          >
            <Plus className="w-5 h-5" />
            {creating ? 'Creating...' : 'Create New Room'}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-rose-gold-light/30" />
            <span className="text-xs text-rose-gold-light font-medium uppercase tracking-wider">
              or join existing
            </span>
            <div className="flex-1 h-px bg-rose-gold-light/30" />
          </div>

          <form onSubmit={handleJoin} className="flex gap-2">
            <input
              type="text"
              placeholder="Room code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="flex-1 bg-cream-dark rounded-xl px-4 py-3 text-center text-lg font-mono font-semibold tracking-[0.3em] text-rose-gold-dark placeholder:text-rose-gold-light/50 placeholder:tracking-normal placeholder:font-normal placeholder:font-body placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/30"
            />
            <button
              type="submit"
              disabled={code.length !== 6 || joining}
              className="bg-rose-gold-dark text-white p-3 rounded-xl active:scale-95 transition-transform disabled:opacity-30"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center mt-3"
            >
              {error}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
