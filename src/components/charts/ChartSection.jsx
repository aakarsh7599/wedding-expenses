import { useState } from 'react'
import CategoryPieChart from './CategoryPieChart'
import PayerPieChart from './PayerPieChart'

export default function ChartSection() {
  const [view, setView] = useState('category')

  return (
    <div>
      <div className="flex items-center gap-1 bg-cream-dark rounded-xl p-1 mb-3">
        {['category', 'payer'].map((opt) => (
          <button
            key={opt}
            onClick={() => setView(opt)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
              view === opt
                ? 'bg-white text-rose-gold-dark shadow-sm'
                : 'text-rose-gold-light'
            }`}
          >
            {opt === 'category' ? 'By Category' : 'By Paid By'}
          </button>
        ))}
      </div>
      {view === 'category' ? <CategoryPieChart /> : <PayerPieChart />}
    </div>
  )
}
