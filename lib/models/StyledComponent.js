

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key] } } } return target }

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

const _react = require('react')

const _validAttr = require('../utils/validAttr')

const _validAttr2 = _interopRequireDefault(_validAttr)

const _isTag = require('../utils/isTag')

const _isTag2 = _interopRequireDefault(_isTag)

const _AbstractStyledComponent = require('./AbstractStyledComponent')

const _AbstractStyledComponent2 = _interopRequireDefault(_AbstractStyledComponent)

const _ThemeProvider = require('./ThemeProvider')

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

const babelPluginFlowReactPropTypes_proptype_Theme = require('./ThemeProvider').babelPluginFlowReactPropTypes_proptype_Theme || require('react').PropTypes.any

const babelPluginFlowReactPropTypes_proptype_Target = require('../types').babelPluginFlowReactPropTypes_proptype_Target || require('react').PropTypes.any

const babelPluginFlowReactPropTypes_proptype_RuleSet = require('../types').babelPluginFlowReactPropTypes_proptype_RuleSet || require('react').PropTypes.any

exports.default = function (ComponentStyle) {
  /* We depend on components having unique IDs */
  const identifiers = {}
  const generateId = function generateId(_displayName) {
    const displayName = _displayName.replace(/[[\].#*$><+~=|^:(),"'`]/g, '-') // Replace all possible CSS selectors
    .replace(/--+/g, '-') // Replace multiple -- with single -
    const nr = (identifiers[displayName] || 0) + 1
    identifiers[displayName] = nr
    const hash = ComponentStyle.generateName(displayName + nr)
    return `${displayName}-${hash}`
  }

  const createStyledComponent = function createStyledComponent(target, options, rules, parent) {
    /* Handle styled(OtherStyledComponent) differently */
    const isStyledComponent = _AbstractStyledComponent2.default.isPrototypeOf(target)
    if (!(0, _isTag2.default)(target) && isStyledComponent) {
      return createStyledComponent(target.target, options, target.rules.concat(rules), target)
    }

    const _options$displayName = options.displayName
    const displayName = _options$displayName === undefined ? (0, _isTag2.default)(target) ? `styled.${target}` : `Styled(${target.displayName})` : _options$displayName
    const _options$componentId = options.componentId
    const componentId = _options$componentId === undefined ? generateId(options.displayName || 'sc') : _options$componentId

    const componentStyle = new ComponentStyle(rules, componentId)
    const ParentComponent = parent || _AbstractStyledComponent2.default

    const StyledComponent = (function (_ParentComponent) {
      _inherits(StyledComponent, _ParentComponent)

      function StyledComponent() {
        _classCallCheck(this, StyledComponent)

        const _this = _possibleConstructorReturn(this, (StyledComponent.__proto__ || Object.getPrototypeOf(StyledComponent)).call(this))

        _this.state = {
          theme: null,
          generatedClassName: '',
        }
        return _this
      }

      _createClass(StyledComponent, [{
        key: 'generateAndInjectStyles',
        value: function generateAndInjectStyles(theme, props) {
          const executionContext = _extends({}, props, { theme })
          return componentStyle.generateAndInjectStyles(executionContext)
        },
      }, {
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
              const generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props)
              _this2.setState({ theme, generatedClassName })
            })
          } else {
            const _theme = this.props.theme || {}
            const generatedClassName = this.generateAndInjectStyles(_theme, this.props)
            this.setState({ theme: _theme, generatedClassName })
          }
        },
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          const _this3 = this

          this.setState((oldState) => {
            const theme = nextProps.theme || oldState.theme
            const generatedClassName = _this3.generateAndInjectStyles(theme, nextProps)

            return { theme, generatedClassName }
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
        key: 'render',
        value: function render() {
          const _this4 = this

          const _props = this.props
          const className = _props.className
          const children = _props.children
          const innerRef = _props.innerRef
          const generatedClassName = this.state.generatedClassName


          const propsForElement = {}
          /* Don't pass through non HTML tags through to HTML elements */
          Object.keys(this.props).filter((propName) => {
            return !(0, _isTag2.default)(target) || (0, _validAttr2.default)(propName)
          }).forEach((propName) => {
            propsForElement[propName] = _this4.props[propName]
          })
          propsForElement.className = [className, componentId, generatedClassName].filter((x) => {
            return x
          }).join(' ')
          if (innerRef) {
            propsForElement.ref = innerRef
            delete propsForElement.innerRef
          }

          return (0, _react.createElement)(target, propsForElement, children)
        },
      }])

      return StyledComponent
    }(ParentComponent))

    StyledComponent.displayName = displayName
    StyledComponent.styledComponentId = componentId
    StyledComponent.target = target
    StyledComponent.rules = rules

    return StyledComponent
  }

  return createStyledComponent
}

module.exports = exports.default
