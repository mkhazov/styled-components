

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _css = require('./css')

const _css2 = _interopRequireDefault(_css)

const _GlobalStyle = require('../models/GlobalStyle')

const _GlobalStyle2 = _interopRequireDefault(_GlobalStyle)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

const babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('react').PropTypes.any

const injectGlobal = function injectGlobal(strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key]
  }

  const globalStyle = new _GlobalStyle2.default(_css2.default.apply(undefined, [strings].concat(interpolations)))
  globalStyle.generateAndInject()
}

exports.default = injectGlobal
module.exports = exports.default
