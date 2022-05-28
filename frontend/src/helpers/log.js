/**
 * @summary console.log wrapper that disables in prod
 * @param {*} message item to log
 * @param {string} type OPTIONAL log type (log|dir|error)
 */
export default function log(message, type = 'log') {
  if (process.env.NODE_ENV !== 'production') {
    if (type === 'error') {
      console.error(new Date().toISOString(), message);
    } else if (type === 'dir') {
      console.dir(new Date().toISOString(), message);
    } else {
      console.log(new Date().toISOString(), message);
    }
  }
}
