/**
 *
 * @param {number} number
 * @returns {string}
 */
export default function abbreviateNumber(number) {
  if (number >= 1_000_000) {
    return `${parseFloat((number / 1_000_000).toFixed(1))}m`;
  }

  if (number >= 100_000) {
    return `${parseInt(number / 1_000, 10)}k`;
  }

  return number.toString();
}
