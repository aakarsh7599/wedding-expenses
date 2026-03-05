function formatINR(amount) {
  return amount.toLocaleString('en-IN')
}

function escapeCSV(val) {
  const str = String(val ?? '')
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"'
  }
  return str
}

function toCSV(headers, rows) {
  const lines = [headers.map(escapeCSV).join(',')]
  for (const row of rows) {
    lines.push(row.map(escapeCSV).join(','))
  }
  return lines.join('\n')
}

function downloadFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportExcel({ expenses, roomCode, mode }) {
  const grandTotal = expenses.reduce((sum, e) => sum + e.amount, 0)
  const isDetailed = mode === 'detailed'
  const sheets = []

  if (isDetailed) {
    const headers = ['Description', 'Category', 'Amount', 'Paid By', 'Date']
    const rows = expenses.map((e) => [
      e.name,
      e.category,
      formatINR(e.amount),
      e.paidBy,
      e.createdAt?.toDate?.() ? e.createdAt.toDate().toLocaleDateString('en-IN') : '',
    ])
    rows.push(['TOTAL', '', formatINR(grandTotal), '', ''])
    sheets.push(toCSV(headers, rows))
  }

  // By Category
  const catMap = {}
  for (const e of expenses) catMap[e.category] = (catMap[e.category] || 0) + e.amount
  const catRows = Object.entries(catMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, total]) => [
      name,
      formatINR(total),
      grandTotal > 0 ? ((total / grandTotal) * 100).toFixed(1) + '%' : '0%',
    ])
  catRows.push(['GRAND TOTAL', formatINR(grandTotal), '100%'])

  // By Payer
  const payerMap = {}
  for (const e of expenses) payerMap[e.paidBy] = (payerMap[e.paidBy] || 0) + e.amount
  const payerRows = Object.entries(payerMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, total]) => [
      name,
      formatINR(total),
      grandTotal > 0 ? ((total / grandTotal) * 100).toFixed(1) + '%' : '0%',
    ])
  payerRows.push(['GRAND TOTAL', formatINR(grandTotal), '100%'])

  sheets.push('')
  sheets.push('BY CATEGORY')
  sheets.push(toCSV(['Category', 'Total', '% of Total'], catRows))
  sheets.push('')
  sheets.push('BY PAYER')
  sheets.push(toCSV(['Payer', 'Total', '% of Total'], payerRows))

  downloadFile(sheets.join('\n'), `wedding-expenses-${roomCode}.csv`, 'text/csv;charset=utf-8')
}
