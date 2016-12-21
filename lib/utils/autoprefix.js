

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _camelizeStyleName = require('fbjs/lib/camelizeStyleName')

const _camelizeStyleName2 = _interopRequireDefault(_camelizeStyleName)

const _hyphenateStyleName = require('fbjs/lib/hyphenateStyleName')

const _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName)

const _static = require('inline-style-prefixer/static')

const _static2 = _interopRequireDefault(_static)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) } else { obj[key] = value } return obj }

// eslint-disable-next-line


const babelPluginFlowReactPropTypes_proptype_Container = require('../vendor/postcss/container').babelPluginFlowReactPropTypes_proptype_Container || require('react').PropTypes.any

exports.default = function (root) {
  root.walkDecls((decl) => {
    /* No point even checking custom props */
    if (/^--/.test(decl.prop)) return

    const objStyle = _defineProperty({}, (0, _camelizeStyleName2.default)(decl.prop), decl.value)
    const prefixed = (0, _static2.default)(objStyle)
    Object.keys(prefixed).forEach((newProp) => {
      const newVals = prefixed[newProp]
      const newValArray = Array.isArray(newVals) ? newVals : [newVals]
      newValArray.forEach((newVal) => {
        decl.cloneBefore({
          prop: (0, _hyphenateStyleName2.default)(newProp),
          value: newVal,
        })
      })
    })
    decl.remove()
  })
}

module.exports = exports.default
