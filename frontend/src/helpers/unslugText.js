/**
 * @param { string } text
 * @returns {string}
 */
export default function unslugText(text) {
  if (!text?.length) return text;

  const decodedURI = decodeURI(text)?.replaceAll('-', ' ');

  return `${decodedURI[0].toUpperCase()}${decodedURI.slice(1, decodedURI?.length)}`;
}
