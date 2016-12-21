

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = stringify

const _stringifier = require('./stringifier')

const _stringifier2 = _interopRequireDefault(_stringifier)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function stringify(node, builder) {
  const str = new _stringifier2.default(builder)
  str.stringify(node)
}
module.exports = exports.default
