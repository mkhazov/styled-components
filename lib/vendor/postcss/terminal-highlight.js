

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _tokenize = require('./tokenize')

const _tokenize2 = _interopRequireDefault(_tokenize)

const _input = require('./input')

const _input2 = _interopRequireDefault(_input)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

const HIGHLIGHT_THEME = {
  brackets: [36, 39], // cyan
  string: [31, 39], // red
  'at-word': [31, 39], // red
  comment: [90, 39], // gray
  '{': [32, 39], // green
  '}': [32, 39], // green
  ':': [1, 22], // bold
  ';': [1, 22], // bold
  '(': [1, 22], // bold
  ')': [1, 22], // bold
}

function code(color) {
  return `\x1B[${color}m`
}

function terminalHighlight(css) {
  const tokens = (0, _tokenize2.default)(new _input2.default(css), { ignoreErrors: true })
  const result = []
  tokens.forEach((token) => {
    const color = HIGHLIGHT_THEME[token[0]]
    if (color) {
      result.push(token[1].split(/\r?\n/).map((i) => {
        return code(color[0]) + i + code(color[1])
      }).join('\n'))
    } else {
      result.push(token[1])
    }
  })
  return result.join('')
}

exports.default = terminalHighlight
module.exports = exports.default
