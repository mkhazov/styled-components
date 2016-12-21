

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('react').PropTypes.any

exports.default = function (strings, interpolations) {
  return interpolations.reduce((array, interp, i) => {
    return array.concat(interp, strings[i + 1])
  }, [strings[0]])
}

module.exports = exports.default
