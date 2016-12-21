

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _hash = require('glamor/lib/hash')

const _hash2 = _interopRequireDefault(_hash)

const _css = require('./css')

const _css2 = _interopRequireDefault(_css)

const _GlobalStyle = require('../models/GlobalStyle')

const _GlobalStyle2 = _interopRequireDefault(_GlobalStyle)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

const babelPluginFlowReactPropTypes_proptype_NameGenerator = require('../types').babelPluginFlowReactPropTypes_proptype_NameGenerator || require('react').PropTypes.any

const babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('react').PropTypes.any

const replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '')
}

exports.default = function (nameGenerator) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key]
    }

    const rules = _css2.default.apply(undefined, [strings].concat(interpolations))
    const hash = (0, _hash2.default)(replaceWhitespace(JSON.stringify(rules)))
    const name = nameGenerator(hash)
    const keyframes = new _GlobalStyle2.default(rules, `@keyframes ${name}`)
    keyframes.generateAndInject()
    return name
  }
}

module.exports = exports.default
