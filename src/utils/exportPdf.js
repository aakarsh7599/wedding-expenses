function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN')
}

function buildTable(headers, rows, footRow) {
  let html = '<table style="width:100%;border-collapse:collapse;font-size:11px;margin-bottom:8px">'
  html += '<thead><tr>'
  for (const h of headers) {
    html += `<th style="background:#b76e79;color:#fff;padding:6px 10px;text-align:left;font-weight:600">${h}</th>`
  }
  html += '</tr></thead><tbody>'
  for (let i = 0; i < rows.length; i++) {
    const bg = i % 2 === 0 ? '#fff' : '#fdf8f4'
    html += '<tr>'
    for (const cell of rows[i]) {
      html += `<td style="padding:5px 10px;border-bottom:1px solid #f5ebe0;background:${bg}">${cell}</td>`
    }
    html += '</tr>'
  }
  if (footRow) {
    html += '<tr>'
    for (const cell of footRow) {
      html += `<td style="padding:6px 10px;background:#f5ebe0;color:#8c5259;font-weight:700">${cell}</td>`
    }
    html += '</tr>'
  }
  html += '</tbody></table>'
  return html
}

export function exportPdf({ expenses, roomCode, mode }) {
  const isDetailed = mode === 'detailed'
  const grandTotal = expenses.reduce((sum, e) => sum + e.amount, 0)
  const title = isDetailed
    ? `Wedding Expenses — Room ${roomCode}`
    : `Wedding Expenses Summary — Room ${roomCode}`

  let body = ''
  body += `<h1 style="color:#8c5259;font-family:'Playfair Display',Georgia,serif;margin:0 0 4px">${title}</h1>`
  body += `<p style="color:#999;font-size:11px;margin:0 0 20px">Generated on ${new Date().toLocaleDateString('en-IN')}</p>`

  if (isDetailed) {
    body += '<h2 style="color:#8c5259;font-size:14px;margin:16px 0 6px">All Expenses</h2>'
    const rows = expenses.map((e) => [
      e.name,
      e.category,
      formatINR(e.amount),
      e.paidBy,
      e.createdAt?.toDate?.() ? e.createdAt.toDate().toLocaleDateString('en-IN') : '—',
    ])
    body += buildTable(
      ['Description', 'Category', 'Amount', 'Paid By', 'Date'],
      rows,
      ['', '', formatINR(grandTotal), '', '']
    )
  }

  // Category breakdown
  const catMap = {}
  for (const e of expenses) catMap[e.category] = (catMap[e.category] || 0) + e.amount
  const catRows = Object.entries(catMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, total]) => [
      name,
      formatINR(total),
      grandTotal > 0 ? ((total / grandTotal) * 100).toFixed(1) + '%' : '0%',
    ])

  body += '<h2 style="color:#8c5259;font-size:14px;margin:16px 0 6px">By Category</h2>'
  body += buildTable(['Category', 'Total', '% of Total'], catRows, ['Grand Total', formatINR(grandTotal), '100%'])

  // Payer breakdown
  const payerMap = {}
  for (const e of expenses) payerMap[e.paidBy] = (payerMap[e.paidBy] || 0) + e.amount
  const payerRows = Object.entries(payerMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, total]) => [
      name,
      formatINR(total),
      grandTotal > 0 ? ((total / grandTotal) * 100).toFixed(1) + '%' : '0%',
    ])

  body += '<h2 style="color:#8c5259;font-size:14px;margin:16px 0 6px">By Payer</h2>'
  body += buildTable(['Payer', 'Total', '% of Total'], payerRows, ['Grand Total', formatINR(grandTotal), '100%'])

  // Open in new window for print-to-PDF
  const win = window.open('', '_blank')
  win.document.write(`<!DOCTYPE html><html><head>
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>body{font-family:'Inter',sans-serif;padding:24px;color:#333;max-width:800px;margin:0 auto}@media print{body{padding:0}}</style>
  </head><body>${body}</body></html>`)
  win.document.close()
  setTimeout(() => win.print(), 500)
}
