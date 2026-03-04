export const payerColors = [
  '#b76e79',
  '#e8927c',
  '#d4a0a7',
  '#c9a96e',
  '#8c5259',
  '#e6b89c',
  '#a78b8b',
  '#c97b84',
]

export function getPayerColor(index) {
  return payerColors[index % payerColors.length]
}
