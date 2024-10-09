const CURRENCY_FORMATTER = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0, 
})

export function formatCurrency(amount: number): string {
    if (isNaN(amount)) {
        throw new Error('Invalid number')
    }
    return CURRENCY_FORMATTER.format(amount)
}
