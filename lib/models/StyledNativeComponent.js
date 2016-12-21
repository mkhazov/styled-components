

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key] } } } return target }

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

const _react = require('react')

const _isTag = require('../utils/isTag')

const _isTag2 = _interopRequireDefault(_isTag)

const _ThemeProvider = require('./ThemeProvider')

const _InlineStyle = require('./InlineStyle')

const _InlineStyle2 = _interopRequireDefault(_InlineStyle)

const _AbstractStyledComponent = require('./AbstractStyledComponent')

const _AbstractStyledComponent2 = _interopRequireDefault(_AbstractStyledComponent)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

const babelPluginFlowReactPropTypes_proptype_Theme = require('./ThemeProvider').babelPluginFlowReactPropTypes_proptype_Theme || require('react').PropTypes.any

const babelPluginFlowReactPropTypes_proptype_Target = require('../types').babelPluginFlowReactPropTypes_proptype_Target || require('react').PropTypes.any

const babelPluginFlowReactPropTypes_proptype_RuleSet = require('../types').babelPluginFlowReactPropTypes_proptype_RuleSet || require('react').PropTypes.any

const createStyledNativeComponent = function createStyledNativeComponent(target, options, rules, parent) {
  /* Handle styled(OtherStyledNativeComponent) differently */
  const isStyledNativeComponent = _AbstractStyledComponent2.default.isPrototypeOf(target)
  if (isStyledNativeComponent && !(0, _isTag2.default)(target)) {
    return createStyledNativeComponent(target.target, options, target.rules.concat(rules), target)
  }

  const _options$displayName = options.displayName
  const displayName = _options$displayName === undefined ? (0, _isTag2.default)(target) ? `styled.${target}` : `Styled(${target.displayName})` : _options$displayName

  const inlineStyle = new _InlineStyle2.default(rules)
  const ParentComponent = parent || _AbstractStyledComponent2.default

  // $FlowIssue need to convince flow that ParentComponent can't be string here

  const StyledNativeComponent = (function (_ParentComponent) {
    _inherits(StyledNativeComponent, _ParentComponent)

    function StyledNativeComponent() {
      _classCallCheck(this, StyledNativeComponent)

      const _this = _possibleConstructorReturn(this, (StyledNativeComponent.__proto__ || Object.getPrototypeOf(StyledNativeComponent)).call(this))

      _this.state = {
        theme: {},
      }
      return _this
    }

    _createClass(StyledNativeComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        const _this2 = this

        // If there is a theme in the context, subscribe to the event emitter. This
        // is necessary due to pure components blocking context updates, this circumvents
        // that by updating when an event is emitted
        if (this.context[_ThemeProvider.CHANNEL]) {
          const subscribe = this.context[_ThemeProvider.CHANNEL]
          this.unsubscribe = subscribe((nextTheme) => {
            // This will be called once immediately
            const theme = _this2.props.theme || nextTheme
            const generatedStyles = _this2.generateAndInjectStyles(theme, _this2.props)
            _this2.setState({ generatedStyles, theme })
          })
        } else {
          const _theme = this.props.theme || {}
          const generatedStyles = this.generateAndInjectStyles(_theme, this.props)
          this.setState({ generatedStyles, theme: _theme })
        }
      },
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        const _this3 = this

        this.setState((oldState) => {
          const theme = nextProps.theme || oldState.theme
          const generatedStyles = _this3.generateAndInjectStyles(theme, nextProps)

          return { theme, generatedStyles }
        })
      },
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.unsubscribe) {
          this.unsubscribe()
        }
      },
    }, {
      key: 'generateAndInjectStyles',
      value: function generateAndInjectStyles(theme, props) {
        const executionContext = _extends({}, props, { theme })
        return inlineStyle.generateStyleObject(executionContext)
      },
      /* eslint-disable react/prop-types */

    }, {
      key: 'render',
      value: function render() {
        const _props = this.props
        const style = _props.style
        const children = _props.children
        const innerRef = _props.innerRef
        const generatedStyles = this.state.generatedStyles


        const propsForElement = _extends({}, this.props)
        propsForElement.style = [generatedStyles, style]
        if (innerRef) {
          propsForElement.ref = innerRef
          delete propsForElement.innerRef
        }

        return (0, _react.createElement)(target, propsForElement, children)
      },
    }])

    return StyledNativeComponent
  }(ParentComponent))

  /* Used for inheritance */


  StyledNativeComponent.rules = rules
  StyledNativeComponent.target = target
  StyledNativeComponent.displayName = displayName

  return StyledNativeComponent
}

exports.default = createStyledNativeComponent
module.exports = exports.default
