

Object.defineProperty(exports, '__esModule', {
  value: true,
})
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/* Some high number, usually 9-digit base-10. Map it to base-😎 */
const generateAlphabeticName = function generateAlphabeticName(code) {
  const lastDigit = chars[code % chars.length]
  return code > chars.length ? `${generateAlphabeticName(Math.floor(code / chars.length))}${lastDigit}` : lastDigit
}

exports.default = generateAlphabeticName
module.exports = exports.default
