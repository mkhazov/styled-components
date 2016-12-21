

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = safeParse

const _input = require('../postcss/input')

const _input2 = _interopRequireDefault(_input)

const _safeParser = require('./safe-parser')

const _safeParser2 = _interopRequireDefault(_safeParser)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function safeParse(css, opts) {
  const input = new _input2.default(css, opts)

  const parser = new _safeParser2.default(input)
  parser.tokenize()
  parser.loop()

  return parser.root
}
module.exports = exports.default
