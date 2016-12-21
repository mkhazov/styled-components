

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

const _parse = require('../vendor/postcss-safe-parser/parse')

const _parse2 = _interopRequireDefault(_parse)

const _postcssNested = require('../vendor/postcss-nested')

const _postcssNested2 = _interopRequireDefault(_postcssNested)

const _flatten = require('../utils/flatten')

const _flatten2 = _interopRequireDefault(_flatten)

const _StyleSheet = require('./StyleSheet')

const _StyleSheet2 = _interopRequireDefault(_StyleSheet)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

const babelPluginFlowReactPropTypes_proptype_RuleSet = require('../types').babelPluginFlowReactPropTypes_proptype_RuleSet || require('react').PropTypes.any

const ComponentStyle = (function () {
  function ComponentStyle(rules, selector) {
    _classCallCheck(this, ComponentStyle)

    this.rules = rules
    this.selector = selector
  }

  _createClass(ComponentStyle, [{
    key: 'generateAndInject',
    value: function generateAndInject() {
      if (!_StyleSheet2.default.injected) _StyleSheet2.default.inject()
      let flatCSS = (0, _flatten2.default)(this.rules).join('')
      if (this.selector) {
        flatCSS = `${this.selector} {${flatCSS}\n}`
      }
      const root = (0, _parse2.default)(flatCSS);
      (0, _postcssNested2.default)(root)
      _StyleSheet2.default.insert(root.toResult().css)
    },
  }])

  return ComponentStyle
}())

exports.default = ComponentStyle
module.exports = exports.default
