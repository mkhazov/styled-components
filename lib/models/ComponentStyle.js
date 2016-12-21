

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

const _hash = require('glamor/lib/hash')

const _hash2 = _interopRequireDefault(_hash)

const _flatten = require('../utils/flatten')

const _flatten2 = _interopRequireDefault(_flatten)

const _parse = require('../vendor/postcss-safe-parser/parse')

const _parse2 = _interopRequireDefault(_parse)

const _postcssNested = require('../vendor/postcss-nested')

const _postcssNested2 = _interopRequireDefault(_postcssNested)

const _autoprefix = require('../utils/autoprefix')

const _autoprefix2 = _interopRequireDefault(_autoprefix)

const _StyleSheet = require('./StyleSheet')

const _StyleSheet2 = _interopRequireDefault(_StyleSheet)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

const babelPluginFlowReactPropTypes_proptype_NameGenerator = require('../types').babelPluginFlowReactPropTypes_proptype_NameGenerator || require('react').PropTypes.any

const babelPluginFlowReactPropTypes_proptype_RuleSet = require('../types').babelPluginFlowReactPropTypes_proptype_RuleSet || require('react').PropTypes.any

/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
exports.default = function (nameGenerator) {
  const inserted = {}

  const ComponentStyle = (function () {
    function ComponentStyle(rules, componentId) {
      _classCallCheck(this, ComponentStyle)

      this.rules = rules
      this.componentId = componentId
      if (!_StyleSheet2.default.injected) _StyleSheet2.default.inject()
      this.insertedRule = _StyleSheet2.default.insert(`.${componentId} {}`)
    }

    _createClass(ComponentStyle, [{
      key: 'generateAndInjectStyles',


      /*
       * Flattens a rule set into valid CSS
       * Hashes it, wraps the whole chunk in a ._hashName {}
       * Parses that with PostCSS then runs PostCSS-Nested on it
       * Returns the hash to be injected on render()
       * */
      value: function generateAndInjectStyles(executionContext) {
        const flatCSS = (0, _flatten2.default)(this.rules, executionContext).join('').replace(/^\s*\/\/.*$/gm, '') // replace JS comments
        const hash = (0, _hash2.default)(this.componentId + flatCSS)
        if (!inserted[hash]) {
          const selector = nameGenerator(hash)
          inserted[hash] = selector
          const root = (0, _parse2.default)(`.${selector} { ${flatCSS} }`);
          (0, _postcssNested2.default)(root);
          (0, _autoprefix2.default)(root)
          this.insertedRule.appendRule(`\n${root.toResult().css}`)
        }
        return inserted[hash]
      },
    }], [{
      key: 'generateName',
      value: function generateName(str) {
        return nameGenerator((0, _hash2.default)(str))
      },
    }])

    return ComponentStyle
  }())

  return ComponentStyle
}

module.exports = exports.default
