

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.objToCss = undefined

const _hyphenateStyleName = require('fbjs/lib/hyphenateStyleName')

const _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName)

const _isPlainObject = require('is-plain-object')

const _isPlainObject2 = _interopRequireDefault(_isPlainObject)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i] } return arr2 } else { return Array.from(arr) } }

const babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('react').PropTypes.any

const objToCss = exports.objToCss = function objToCss(obj) {
  return Object.keys(obj).map((key) => {
    return `${(0, _hyphenateStyleName2.default)(key)}: ${obj[key]};`
  }).join(' ')
}

const flatten = function flatten(chunks, executionContext) {
  return chunks.reduce((ruleSet, chunk) => {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') return ruleSet
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) return [].concat(_toConsumableArray(ruleSet), _toConsumableArray(flatten(chunk, executionContext)))

    /* Handle other components */
    // $FlowIssue not sure how to make this pass
    if (chunk.hasOwnProperty('styledComponentId')) return [].concat(_toConsumableArray(ruleSet), [`.${chunk.styledComponentId}`])

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, _toConsumableArray(flatten([chunk(executionContext)], executionContext))) : ruleSet.concat(chunk)
    }

    /* Handle objects */
    // $FlowIssue have to add %checks somehow to isPlainObject
    return ruleSet.concat((0, _isPlainObject2.default)(chunk) ? objToCss(chunk) : chunk.toString())
  }, [])
}

exports.default = flatten
