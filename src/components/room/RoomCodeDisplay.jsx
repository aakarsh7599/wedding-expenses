import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useRoomContext } from '../../context/RoomContext'

export default function RoomCodeDisplay() {
  const { roomCode } = useRoomContext()
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(roomCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 bg-rose-gold/10 text-rose-gold-dark px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider active:scale-95 transition-transform"
    >
      {roomCode}
      {copied ? (
        <Check className="w-3 h-3 text-green-600" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </button>
  )
}
