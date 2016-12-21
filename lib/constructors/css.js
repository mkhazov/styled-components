

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _interleave = require('../utils/interleave')

const _interleave2 = _interopRequireDefault(_interleave)

const _flatten = require('../utils/flatten')

const _flatten2 = _interopRequireDefault(_flatten)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

const babelPluginFlowReactPropTypes_proptype_RuleSet = require('../types').babelPluginFlowReactPropTypes_proptype_RuleSet || require('react').PropTypes.any

const babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('react').PropTypes.any

exports.default = function (strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key]
  }

  return (0, _flatten2.default)((0, _interleave2.default)(strings, interpolations))
}

module.exports = exports.default
