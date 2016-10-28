import crypto from 'crypto'

/**
 * Generates MD5 hash by given string.
 *
 * @param {String} str
 * @return {String}
 */

export function md5(str) {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex')
}
