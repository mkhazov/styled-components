

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.withTheme = exports.ThemeProvider = exports.injectGlobal = exports.keyframes = exports.css = undefined

const _generateAlphabeticName = require('./utils/generateAlphabeticName')

const _generateAlphabeticName2 = _interopRequireDefault(_generateAlphabeticName)

const _css = require('./constructors/css')

const _css2 = _interopRequireDefault(_css)

const _injectGlobal = require('./constructors/injectGlobal')

const _injectGlobal2 = _interopRequireDefault(_injectGlobal)

const _StyledComponent = require('./models/StyledComponent')

const _StyledComponent2 = _interopRequireDefault(_StyledComponent)

const _styled2 = require('./constructors/styled')

const _styled3 = _interopRequireDefault(_styled2)

const _keyframes2 = require('./constructors/keyframes')

const _keyframes3 = _interopRequireDefault(_keyframes2)

const _ComponentStyle2 = require('./models/ComponentStyle')

const _ComponentStyle3 = _interopRequireDefault(_ComponentStyle2)

const _ThemeProvider = require('./models/ThemeProvider')

const _ThemeProvider2 = _interopRequireDefault(_ThemeProvider)

const _withTheme = require('./hoc/withTheme')

const _withTheme2 = _interopRequireDefault(_withTheme)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

/* Instantiate singletons */


/* Import components */


/* Import singleton constructors */
const keyframes = (0, _keyframes3.default)(_generateAlphabeticName2.default)

/* Import Higher Order Components */


/* Import singletons */

const styled = (0, _styled3.default)((0, _StyledComponent2.default)((0, _ComponentStyle3.default)(_generateAlphabeticName2.default)))

/* Export everything */
exports.default = styled
exports.css = _css2.default
exports.keyframes = keyframes
exports.injectGlobal = _injectGlobal2.default
exports.ThemeProvider = _ThemeProvider2.default
exports.withTheme = _withTheme2.default
