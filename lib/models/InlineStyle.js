

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())
/* eslint-disable import/no-unresolved */


const _hash = require('glamor/lib/hash')

const _hash2 = _interopRequireDefault(_hash)

const _reactNative = require('react-native')

const _cssToReactNative = require('css-to-react-native')

const _cssToReactNative2 = _interopRequireDefault(_cssToReactNative)

const _flatten = require('../utils/flatten')

const _flatten2 = _interopRequireDefault(_flatten)

const _parse = require('../vendor/postcss-safe-parser/parse')

const _parse2 = _interopRequireDefault(_parse)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

const babelPluginFlowReactPropTypes_proptype_RuleSet = require('../types').babelPluginFlowReactPropTypes_proptype_RuleSet || require('react').PropTypes.any

const generated = {}

/*
 InlineStyle takes arbitrary CSS and generates a flat object
 */

const InlineStyle = (function () {
  function InlineStyle(rules) {
    _classCallCheck(this, InlineStyle)

    this.rules = rules
  }

  _createClass(InlineStyle, [{
    key: 'generateStyleObject',
    value: function generateStyleObject(executionContext) {
      const flatCSS = (0, _flatten2.default)(this.rules, executionContext).join('')
      const hash = (0, _hash2.default)(flatCSS)
      if (!generated[hash]) {
        (function () {
          const root = (0, _parse2.default)(flatCSS)
          const declPairs = []
          root.each((node) => {
            if (node.type === 'decl') {
              declPairs.push([node.prop, node.value])
            } else {
              /* eslint-disable no-console */
              console.warn(`Node of type ${node.type} not supported as an inline style`)
            }
          })
          // RN currently does not support differing values for the corner radii of Image
          // components (but does for View). It is almost impossible to tell whether we'll have
          // support, so we'll just disable multiple values here.
          // https://github.com/styled-components/css-to-react-native/issues/11
          const styleObject = (0, _cssToReactNative2.default)(declPairs, ['borderRadius', 'borderWidth', 'borderColor', 'borderStyle'])
          const styles = _reactNative.StyleSheet.create({
            generated: styleObject,
          })
          generated[hash] = styles.generated
        }())
      }
      return generated[hash]
    },
  }])

  return InlineStyle
}())

exports.default = InlineStyle
module.exports = exports.default
