

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.expectCSSMatches = exports.resetStyled = undefined

const _expect = require('expect')

const _expect2 = _interopRequireDefault(_expect)

const _styled2 = require('../constructors/styled')

const _styled3 = _interopRequireDefault(_styled2)

const _StyleSheet = require('../models/StyleSheet')

const _StyleSheet2 = _interopRequireDefault(_StyleSheet)

const _StyledComponent = require('../models/StyledComponent')

const _StyledComponent2 = _interopRequireDefault(_StyledComponent)

const _ComponentStyle2 = require('../models/ComponentStyle')

const _ComponentStyle3 = _interopRequireDefault(_ComponentStyle2)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

/* Ignore hashing, just return class names sequentially as .a .b .c etc */
let index = 0
/**
 * This sets up our end-to-end test suite, which essentially makes sure
 * our public API works the way we promise/want
 */

const classNames = function classNames() {
  return String.fromCodePoint(97 + index++)
}

const resetStyled = exports.resetStyled = function resetStyled() {
  if (_StyleSheet2.default.sheet) _StyleSheet2.default.flush()
  index = 0
  return (0, _styled3.default)((0, _StyledComponent2.default)((0, _ComponentStyle3.default)(classNames)))
}

const stripWhitespace = function stripWhitespace(str) {
  return str.trim().replace(/\s+/g, ' ')
}
const expectCSSMatches = exports.expectCSSMatches = function expectCSSMatches(expectation) {
  const opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ignoreWhitespace: true }

  const css = _StyleSheet2.default.rules().map((rule) => {
    return rule.cssText
  }).join('\n')
  if (opts.ignoreWhitespace) {
    (0, _expect2.default)(stripWhitespace(css)).toEqual(stripWhitespace(expectation))
  } else {
    (0, _expect2.default)(css).toEqual(expectation)
  }
  return css
}
