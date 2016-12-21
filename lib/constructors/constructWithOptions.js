

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key] } } } return target }

const _css = require('./css')

const _css2 = _interopRequireDefault(_css)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

const babelPluginFlowReactPropTypes_proptype_Target = require('../types').babelPluginFlowReactPropTypes_proptype_Target || require('react').PropTypes.any

const babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('react').PropTypes.any

const constructWithOptions = function constructWithOptions(componentConstructor, tag) {
  const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

  const
  /* This is callable directly as a template function */templateFunction = function templateFunction(strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key]
    }

    return componentConstructor(tag, options, _css2.default.apply(undefined, [strings].concat(interpolations)))
  }

  /* If withConfig is called, wrap up a new template function and merge options */
  templateFunction.withConfig = function (config) {
    return constructWithOptions(componentConstructor, tag, _extends({}, options, config))
  }

  return templateFunction
}

exports.default = constructWithOptions
module.exports = exports.default
