import { CURRENCIES, CurrencyCode } from '../types';

export function convertFromINR(amountInINR: number, targetCurrency: CurrencyCode): number {
  const config = CURRENCIES[targetCurrency];
  if (!config) return amountInINR;
  const converted = amountInINR * config.rateFromINR;
  return Number(converted.toFixed(config.decimals));
}

export function formatPrice(amountInINR: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency];
  const converted = convertFromINR(amountInINR, currency);
  
  if (currency === 'INR') {
    return `${config.symbol}${converted.toLocaleString('en-IN')}`;
  }
  
  return `${config.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  })}`;
}
