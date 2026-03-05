import { useState, useMemo, useCallback } from 'react'
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts'
import { useRoomContext } from '../../context/RoomContext'
import formatCurrency from '../../utils/formatCurrency'

function renderActiveShape(props) {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value, percent,
  } = props

  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" className="fill-rose-gold-dark text-xs font-semibold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" className="fill-rose-gold-dark text-sm font-bold font-heading">
        {formatCurrency(value)}
      </text>
      <text x={cx} y={cy + 26} textAnchor="middle" className="fill-rose-gold-light text-[10px]">
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius - 1}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

export default function CategoryPieChart() {
  const { expenses, categories } = useRoomContext()
  const [activeIndex, setActiveIndex] = useState(0)

  const data = useMemo(() => {
    const map = {}
    for (const exp of expenses) {
      map[exp.category] = (map[exp.category] || 0) + exp.amount
    }
    return categories
      .filter((c) => map[c.name])
      .map((c) => ({ name: c.name, value: map[c.name], color: c.color }))
  }, [expenses, categories])

  const onPieEnter = useCallback((_, index) => setActiveIndex(index), [])

  if (data.length === 0) return null

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm shadow-rose-200/20">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
            onClick={(_, index) => setActiveIndex(index)}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 justify-center">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[11px] text-rose-gold-dark">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
