

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key] } } } return target }

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _ThemeProvider = require('../models/ThemeProvider')

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) } else { obj[key] = value } return obj }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

exports.default = function (Component) {
  let _class, _temp2

  return _temp2 = _class = (function (_React$Component) {
    _inherits(_class, _React$Component)

    function _class() {
      let _ref

      let _temp, _this, _ret

      _classCallCheck(this, _class)

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key]
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret)
    }

    _createClass(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        const _this2 = this

        if (!this.context[_ThemeProvider.CHANNEL]) {
          throw new Error('[withTheme] Please use ThemeProvider to be able to use withTheme')
        }

        const subscribe = this.context[_ThemeProvider.CHANNEL]
        this.unsubscribe = subscribe((theme) => {
          _this2.setState({ theme })
        })
      },
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (typeof this.unsubscribe === 'function') this.unsubscribe()
      },
    }, {
      key: 'render',
      value: function render() {
        const theme = this.state.theme


        return _react2.default.createElement(Component, _extends({ theme }, this.props))
      },
    }])

    return _class
  }(_react2.default.Component)), _class.contextTypes = _defineProperty({}, _ThemeProvider.CHANNEL, _react2.default.PropTypes.func), _temp2
}

module.exports = exports.default
