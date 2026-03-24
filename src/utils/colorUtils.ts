export function attachOpacity(hex: string, opacity: number): string {
  const alpha = Math.round(Math.max(0, Math.min(1, opacity)) * 255);
  const aa = alpha.toString(16).padStart(2, "0");
  return `${hex}${aa}`;
}
