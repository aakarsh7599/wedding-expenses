import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, FileText, Table, X } from 'lucide-react'
import { useRoomContext } from '../../context/RoomContext'
import { exportPdf } from '../../utils/exportPdf'
import { exportExcel } from '../../utils/exportExcel'

export default function ExportMenu() {
  const { expenses, categories, payers, roomCode } = useRoomContext()
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState('pdf')
  const [scope, setScope] = useState('detailed')

  function handleExport() {
    const params = { expenses, categories, payers, roomCode, mode: scope }
    if (format === 'pdf') {
      exportPdf(params)
    } else {
      exportExcel(params)
    }
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={expenses.length === 0}
        className="p-1.5 text-rose-gold-light hover:text-rose-gold-dark active:scale-95 transition disabled:opacity-30"
        title="Export"
      >
        <Download className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-5 w-full max-w-xs shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-rose-gold-dark">
                  Export
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 text-rose-gold-light hover:text-rose-gold-dark"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Format */}
              <label className="text-[10px] text-rose-gold-light uppercase tracking-wider mb-1.5 block font-semibold">
                Format
              </label>
              <div className="flex gap-2 mb-4">
                {[
                  { id: 'pdf', label: 'PDF', icon: FileText },
                  { id: 'excel', label: 'CSV', icon: Table },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setFormat(id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                      format === id
                        ? 'bg-rose-gold text-white shadow-md'
                        : 'bg-cream-dark text-rose-gold-dark'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Scope */}
              <label className="text-[10px] text-rose-gold-light uppercase tracking-wider mb-1.5 block font-semibold">
                Content
              </label>
              <div className="flex gap-2 mb-5">
                {[
                  { id: 'detailed', label: 'Detailed' },
                  { id: 'summary', label: 'Summary' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setScope(id)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                      scope === id
                        ? 'bg-rose-gold text-white shadow-md'
                        : 'bg-cream-dark text-rose-gold-dark'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center gap-2 bg-rose-gold text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
