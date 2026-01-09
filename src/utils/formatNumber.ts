/**
 * Formats large numbers into human-readable format with K, M, B, T suffixes
 */
export function formatNumber(num: number): string {
  if (num < 1000) {
    return num % 1 === 0 ? num.toString() : num.toFixed(1);
  }

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);

  if (tier >= suffixes.length) {
    return num.toExponential(2);
  }

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  // Show 1 decimal place if needed, otherwise whole number
  const formatted = scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);

  return formatted + suffix;
}
