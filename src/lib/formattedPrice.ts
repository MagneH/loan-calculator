export const formattedPrice = (number: number): string =>
  number
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
