import { Currency } from '../types';

export const USD_TO_NGN_RATE = 2000;

export const formatPrice = (amountNGN: number, amountUSD: number, currency: Currency): string => {
  if (currency === 'USD') {
    return `$${amountUSD.toLocaleString()}`;
  }
  return `₦${amountNGN.toLocaleString()}`;
};
