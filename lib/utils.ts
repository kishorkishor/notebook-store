import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    currencyDisplay: 'narrowSymbol'
  }).format(price)
  .replace('BDT', 'Tk')
  .replace(/\s/g, '')
}
