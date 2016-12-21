

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = warnOnce
const printed = {}

function warnOnce(message) {
  if (printed[message]) return
  printed[message] = true

  if (typeof console !== 'undefined' && console.warn) console.warn(message)
}
module.exports = exports.default
