

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

const _declaration = require('./declaration')

const _declaration2 = _interopRequireDefault(_declaration)

const _tokenize = require('./tokenize')

const _tokenize2 = _interopRequireDefault(_tokenize)

const _comment = require('./comment')

const _comment2 = _interopRequireDefault(_comment)

const _atRule = require('./at-rule')

const _atRule2 = _interopRequireDefault(_atRule)

const _root = require('./root')

const _root2 = _interopRequireDefault(_root)

const _rule = require('./rule')

const _rule2 = _interopRequireDefault(_rule)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

const Parser = (function () {
  function Parser(input) {
    _classCallCheck(this, Parser)

    this.input = input

    this.pos = 0
    this.root = new _root2.default()
    this.current = this.root
    this.spaces = ''
    this.semicolon = false

    this.root.source = { input, start: { line: 1, column: 1 } }
  }

  _createClass(Parser, [{
    key: 'tokenize',
    value: function tokenize() {
      this.tokens = (0, _tokenize2.default)(this.input)
    },
  }, {
    key: 'loop',
    value: function loop() {
      let token = void 0
      while (this.pos < this.tokens.length) {
        token = this.tokens[this.pos]

        switch (token[0]) {

          case 'space':
          case ';':
            this.spaces += token[1]
            break

          case '}':
            this.end(token)
            break

          case 'comment':
            this.comment(token)
            break

          case 'at-word':
            this.atrule(token)
            break

          case '{':
            this.emptyRule(token)
            break

          default:
            this.other()
            break
        }

        this.pos += 1
      }
      this.endFile()
    },
  }, {
    key: 'comment',
    value: function comment(token) {
      const node = new _comment2.default()
      this.init(node, token[2], token[3])
      node.source.end = { line: token[4], column: token[5] }

      const text = token[1].slice(2, -2)
      if (/^\s*$/.test(text)) {
        node.text = ''
        node.raws.left = text
        node.raws.right = ''
      } else {
        const match = text.match(/^(\s*)([^]*[^\s])(\s*)$/)
        node.text = match[2]
        node.raws.left = match[1]
        node.raws.right = match[3]
      }
    },
  }, {
    key: 'emptyRule',
    value: function emptyRule(token) {
      const node = new _rule2.default()
      this.init(node, token[2], token[3])
      node.selector = ''
      node.raws.between = ''
      this.current = node
    },
  }, {
    key: 'other',
    value: function other() {
      let token = void 0
      let end = false
      let type = null
      let colon = false
      let bracket = null
      const brackets = []

      const start = this.pos
      while (this.pos < this.tokens.length) {
        token = this.tokens[this.pos]
        type = token[0]

        if (type === '(' || type === '[') {
          if (!bracket) bracket = token
          brackets.push(type === '(' ? ')' : ']')
        } else if (brackets.length === 0) {
            if (type === ';') {
              if (colon) {
                this.decl(this.tokens.slice(start, this.pos + 1))
                return
              } else {
                break
              }
            } else if (type === '{') {
              this.rule(this.tokens.slice(start, this.pos + 1))
              return
            } else if (type === '}') {
              this.pos -= 1
              end = true
              break
            } else if (type === ':') {
              colon = true
            }
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop()
            if (brackets.length === 0) bracket = null
          }

        this.pos += 1
      }
      if (this.pos === this.tokens.length) {
        this.pos -= 1
        end = true
      }

      if (brackets.length > 0) this.unclosedBracket(bracket)

      if (end && colon) {
        while (this.pos > start) {
          token = this.tokens[this.pos][0]
          if (token !== 'space' && token !== 'comment') break
          this.pos -= 1
        }
        this.decl(this.tokens.slice(start, this.pos + 1))
        return
      }

      this.unknownWord(start)
    },
  }, {
    key: 'rule',
    value: function rule(tokens) {
      tokens.pop()

      const node = new _rule2.default()
      this.init(node, tokens[0][2], tokens[0][3])

      node.raws.between = this.spacesFromEnd(tokens)
      this.raw(node, 'selector', tokens)
      this.current = node
    },
  }, {
    key: 'decl',
    value: function decl(tokens) {
      const node = new _declaration2.default()
      this.init(node)

      const last = tokens[tokens.length - 1]
      if (last[0] === ';') {
          this.semicolon = true
          tokens.pop()
        }
      if (last[4]) {
          node.source.end = { line: last[4], column: last[5] }
        } else {
          node.source.end = { line: last[2], column: last[3] }
        }

      while (tokens[0][0] !== 'word') {
          node.raws.before += tokens.shift()[1]
        }
      node.source.start = { line: tokens[0][2], column: tokens[0][3] }

      node.prop = ''
      while (tokens.length) {
          const type = tokens[0][0]
          if (type === ':' || type === 'space' || type === 'comment') {
            break
          }
          node.prop += tokens.shift()[1]
        }

      node.raws.between = ''

      let token = void 0
      while (tokens.length) {
          token = tokens.shift()

          if (token[0] === ':') {
            node.raws.between += token[1]
            break
          } else {
            node.raws.between += token[1]
          }
        }

      if (node.prop[0] === '_' || node.prop[0] === '*') {
          node.raws.before += node.prop[0]
          node.prop = node.prop.slice(1)
        }
      node.raws.between += this.spacesFromStart(tokens)
      this.precheckMissedSemicolon(tokens)

      for (let i = tokens.length - 1; i > 0; i--) {
          token = tokens[i]
          if (token[1] === '!important') {
            node.important = true
            let string = this.stringFrom(tokens, i)
            string = this.spacesFromEnd(tokens) + string
            if (string !== ' !important') node.raws.important = string
            break
          } else if (token[1] === 'important') {
            const cache = tokens.slice(0)
            let str = ''
            for (let j = i; j > 0; j--) {
              const _type = cache[j][0]
              if (str.trim().indexOf('!') === 0 && _type !== 'space') {
                break
              }
              str = cache.pop()[1] + str
            }
            if (str.trim().indexOf('!') === 0) {
              node.important = true
              node.raws.important = str
              tokens = cache
            }
          }

          if (token[0] !== 'space' && token[0] !== 'comment') {
            break
          }
        }

      this.raw(node, 'value', tokens)

      if (node.value.indexOf(':') !== -1) this.checkMissedSemicolon(tokens)
    },
  }, {
    key: 'atrule',
    value: function atrule(token) {
        const node = new _atRule2.default()
        node.name = token[1].slice(1)
        if (node.name === '') {
          this.unnamedAtrule(node, token)
        }
        this.init(node, token[2], token[3])

        let last = false
        let open = false
        const params = []

        this.pos += 1
        while (this.pos < this.tokens.length) {
          token = this.tokens[this.pos]

          if (token[0] === ';') {
            node.source.end = { line: token[2], column: token[3] }
            this.semicolon = true
            break
          } else if (token[0] === '{') {
            open = true
            break
          } else if (token[0] === '}') {
            this.end(token)
            break
          } else {
            params.push(token)
          }

          this.pos += 1
        }
        if (this.pos === this.tokens.length) {
          last = true
        }

        node.raws.between = this.spacesFromEnd(params)
        if (params.length) {
          node.raws.afterName = this.spacesFromStart(params)
          this.raw(node, 'params', params)
          if (last) {
            token = params[params.length - 1]
            node.source.end = { line: token[4], column: token[5] }
            this.spaces = node.raws.between
            node.raws.between = ''
          }
        } else {
          node.raws.afterName = ''
          node.params = ''
        }

        if (open) {
          node.nodes = []
          this.current = node
        }
      },
  }, {
      key: 'end',
      value: function end(token) {
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon
        }
        this.semicolon = false

        this.current.raws.after = (this.current.raws.after || '') + this.spaces
        this.spaces = ''

        if (this.current.parent) {
          this.current.source.end = { line: token[2], column: token[3] }
          this.current = this.current.parent
        } else {
          this.unexpectedClose(token)
        }
      },
    }, {
      key: 'endFile',
      value: function endFile() {
        if (this.current.parent) this.unclosedBlock()
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon
        }
        this.current.raws.after = (this.current.raws.after || '') + this.spaces
      },

        // Helpers

    }, {
      key: 'init',
      value: function init(node, line, column) {
        this.current.push(node)

        node.source = { start: { line, column }, input: this.input }
        node.raws.before = this.spaces
        this.spaces = ''
        if (node.type !== 'comment') this.semicolon = false
      },
    }, {
      key: 'raw',
      value: function raw(node, prop, tokens) {
        let token = void 0,
          type = void 0
        const length = tokens.length
        let value = ''
        let clean = true
        for (let i = 0; i < length; i += 1) {
          token = tokens[i]
          type = token[0]
          if (type === 'comment' || type === 'space' && i === length - 1) {
            clean = false
          } else {
            value += token[1]
          }
        }
        if (!clean) {
          const raw = tokens.reduce((all, i) => {
            return all + i[1]
          }, '')
          node.raws[prop] = { value, raw }
        }
        node[prop] = value
      },
    }, {
      key: 'spacesFromEnd',
      value: function spacesFromEnd(tokens) {
        let lastTokenType = void 0
        let spaces = ''
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0]
          if (lastTokenType !== 'space' && lastTokenType !== 'comment') break
          spaces = tokens.pop()[1] + spaces
        }
        return spaces
      },
    }, {
      key: 'spacesFromStart',
      value: function spacesFromStart(tokens) {
        let next = void 0
        let spaces = ''
        while (tokens.length) {
          next = tokens[0][0]
          if (next !== 'space' && next !== 'comment') break
          spaces += tokens.shift()[1]
        }
        return spaces
      },
    }, {
      key: 'stringFrom',
      value: function stringFrom(tokens, from) {
        let result = ''
        for (let i = from; i < tokens.length; i++) {
          result += tokens[i][1]
        }
        tokens.splice(from, tokens.length - from)
        return result
      },
    }, {
      key: 'colon',
      value: function colon(tokens) {
        let brackets = 0
        let token = void 0,
          type = void 0,
          prev = void 0
        for (let i = 0; i < tokens.length; i++) {
          token = tokens[i]
          type = token[0]

          if (type === '(') {
            brackets += 1
          } else if (type === ')') {
            brackets -= 1
          } else if (brackets === 0 && type === ':') {
            if (!prev) {
              this.doubleColon(token)
            } else if (prev[0] === 'word' && prev[1] === 'progid') {
              continue
            } else {
              return i
            }
          }

          prev = token
        }
        return false
      },

        // Errors

    }, {
      key: 'unclosedBracket',
      value: function unclosedBracket(bracket) {
        throw this.input.error('Unclosed bracket', bracket[2], bracket[3])
      },
    }, {
      key: 'unknownWord',
      value: function unknownWord(start) {
        const token = this.tokens[start]
        throw this.input.error('Unknown word', token[2], token[3])
      },
    }, {
      key: 'unexpectedClose',
      value: function unexpectedClose(token) {
        throw this.input.error('Unexpected }', token[2], token[3])
      },
    }, {
      key: 'unclosedBlock',
      value: function unclosedBlock() {
        const pos = this.current.source.start
        throw this.input.error('Unclosed block', pos.line, pos.column)
      },
    }, {
      key: 'doubleColon',
      value: function doubleColon(token) {
        throw this.input.error('Double colon', token[2], token[3])
      },
    }, {
      key: 'unnamedAtrule',
      value: function unnamedAtrule(node, token) {
        throw this.input.error('At-rule without name', token[2], token[3])
      },
    }, {
      key: 'precheckMissedSemicolon',
      value: function precheckMissedSemicolon(tokens) {
            // Hook for Safe Parser
        tokens
      },
    }, {
      key: 'checkMissedSemicolon',
      value: function checkMissedSemicolon(tokens) {
        const colon = this.colon(tokens)
        if (colon === false) return

        let founded = 0
        let token = void 0
        for (let j = colon - 1; j >= 0; j--) {
          token = tokens[j]
          if (token[0] !== 'space') {
            founded += 1
            if (founded === 2) break
          }
        }
        throw this.input.error('Missed semicolon', token[2], token[3])
      },
    }])

  return Parser
}())

exports.default = Parser
module.exports = exports.default
