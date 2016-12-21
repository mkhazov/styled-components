

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.withTheme = exports.ThemeProvider = exports.css = undefined

const _reactNative = require('react-native')

const _reactNative2 = _interopRequireDefault(_reactNative)

const _constructWithOptions = require('../constructors/constructWithOptions')

const _constructWithOptions2 = _interopRequireDefault(_constructWithOptions)

const _css = require('../constructors/css')

const _css2 = _interopRequireDefault(_css)

const _StyledNativeComponent = require('../models/StyledNativeComponent')

const _StyledNativeComponent2 = _interopRequireDefault(_StyledNativeComponent)

const _ThemeProvider = require('../models/ThemeProvider')

const _ThemeProvider2 = _interopRequireDefault(_ThemeProvider)

const _withTheme = require('../hoc/withTheme')

const _withTheme2 = _interopRequireDefault(_withTheme)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

/* eslint-disable import/no-unresolved */
const babelPluginFlowReactPropTypes_proptype_Target = require('../types').babelPluginFlowReactPropTypes_proptype_Target || require('react').PropTypes.any

const styled = function styled(tag) {
  return (0, _constructWithOptions2.default)(_StyledNativeComponent2.default, tag)
}

/* React native lazy-requires each of these modules for some reason, so let's
*  assume it's for a good reason and not eagerly load them all */
const aliases = 'ActivityIndicator ActivityIndicatorIOS ART DatePickerIOS DrawerLayoutAndroid\n Image ImageEditor ImageStore KeyboardAvoidingView ListView MapView Modal Navigator NavigatorIOS\n Picker PickerIOS ProgressBarAndroid ProgressViewIOS ScrollView SegmentedControlIOS Slider\n SliderIOS SnapshotViewIOS Switch RecyclerViewBackedScrollView RefreshControl StatusBar\n SwipeableListView SwitchAndroid SwitchIOS TabBarIOS Text TextInput ToastAndroid ToolbarAndroid\n Touchable TouchableHighlight TouchableNativeFeedback TouchableOpacity TouchableWithoutFeedback\n View ViewPagerAndroid WebView'

/* Define a getter for each alias which simply gets the reactNative component
 * and passes it to styled */
aliases.split(/\s+/m).forEach((alias) => {
  return Object.defineProperty(styled, alias, {
    enumerable: true,
    configurable: false,
    get: function get() {
      return styled(_reactNative2.default[alias])
    },
  })
})

exports.css = _css2.default
exports.ThemeProvider = _ThemeProvider2.default
exports.withTheme = _withTheme2.default
exports.default = styled
