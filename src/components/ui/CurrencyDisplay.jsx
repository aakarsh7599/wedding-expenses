import formatCurrency from '../../utils/formatCurrency'

export default function CurrencyDisplay({ amount, className = '' }) {
  return <span className={className}>{formatCurrency(amount)}</span>
}
