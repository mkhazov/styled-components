

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

const _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }

const _stringify2 = require('./stringify')

const _stringify3 = _interopRequireDefault(_stringify2)

const _warnOnce = require('./warn-once')

const _warnOnce2 = _interopRequireDefault(_warnOnce)

const _result = require('./result')

const _result2 = _interopRequireDefault(_result)

const _parse = require('./parse')

const _parse2 = _interopRequireDefault(_parse)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function isPromise(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.then === 'function'
}

/**
 * @callback onFulfilled
 * @param {Result} result
 */

/**
 * @callback onRejected
 * @param {Error} error
 */

/**
 * A Promise proxy for the result of PostCSS transformations.
 *
 * A `LazyResult` instance is returned by {@link Processor#process}.
 *
 * @example
 * const lazy = postcss([cssnext]).process(css);
 */

const LazyResult = (function () {
  function LazyResult(processor, css, opts) {
    _classCallCheck(this, LazyResult)

    this.stringified = false
    this.processed = false

    let root = void 0
    if ((typeof css === 'undefined' ? 'undefined' : _typeof(css)) === 'object' && css.type === 'root') {
      root = css
    } else if (css instanceof LazyResult || css instanceof _result2.default) {
      root = css.root
      if (css.map) {
        if (typeof opts.map === 'undefined') opts.map = {}
        if (!opts.map.inline) opts.map.inline = false
        opts.map.prev = css.map
      }
    } else {
      let parser = _parse2.default
      if (opts.syntax) parser = opts.syntax.parse
      if (opts.parser) parser = opts.parser
      if (parser.parse) parser = parser.parse

      try {
        root = parser(css, opts)
      } catch (error) {
        this.error = error
      }
    }

    this.result = new _result2.default(processor, root, opts)
  }

    /**
     * Returns a {@link Processor} instance, which will be used
     * for CSS transformations.
     * @type {Processor}
     */


  _createClass(LazyResult, [{
    key: 'warnings',


        /**
         * Processes input CSS through synchronous plugins
         * and calls {@link Result#warnings()}.
         *
         * @return {Warning[]} warnings from plugins
         */
    value: function warnings() {
      return this.sync().warnings()
    },

        /**
         * Alias for the {@link LazyResult#css} property.
         *
         * @example
         * lazy + '' === lazy.css;
         *
         * @return {string} output CSS
         */

  }, {
    key: 'toString',
    value: function toString() {
      return this.css
    },

        /**
         * Processes input CSS through synchronous and asynchronous plugins
         * and calls `onFulfilled` with a Result instance. If a plugin throws
         * an error, the `onRejected` callback will be executed.
         *
         * It implements standard Promise API.
         *
         * @param {onFulfilled} onFulfilled - callback will be executed
         *                                    when all plugins will finish work
         * @param {onRejected}  onRejected  - callback will be execited on any error
         *
         * @return {Promise} Promise API to make queue
         *
         * @example
         * postcss([cssnext]).process(css).then(result => {
         *   console.log(result.css);
         * });
         */

  }, {
    key: 'then',
    value: function then(onFulfilled, onRejected) {
      return this.async().then(onFulfilled, onRejected)
    },

        /**
         * Processes input CSS through synchronous and asynchronous plugins
         * and calls onRejected for each error thrown in any plugin.
         *
         * It implements standard Promise API.
         *
         * @param {onRejected} onRejected - callback will be execited on any error
         *
         * @return {Promise} Promise API to make queue
         *
         * @example
         * postcss([cssnext]).process(css).then(result => {
         *   console.log(result.css);
         * }).catch(error => {
         *   console.error(error);
         * });
         */

  }, {
    key: 'catch',
    value: function _catch(onRejected) {
      return this.async().catch(onRejected)
    },
  }, {
    key: 'handleError',
    value: function handleError(error, plugin) {
      try {
        this.error = error
        if (error.name === 'CssSyntaxError' && !error.plugin) {
          error.plugin = plugin.postcssPlugin
          error.setMessage()
        } else if (plugin.postcssVersion) {
            const pluginName = plugin.postcssPlugin
            const pluginVer = plugin.postcssVersion
            const runtimeVer = this.result.processor.version
            const a = pluginVer.split('.')
            const b = runtimeVer.split('.')

            if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
              (0, _warnOnce2.default)(`${'Your current PostCSS version ' + 'is '}${runtimeVer}, but ${pluginName} ` + `uses ${pluginVer}. Perhaps this is ` + 'the source of the error below.')
            }
          }
      } catch (err) {
        if (console && console.error) console.error(err)
      }
    },
  }, {
    key: 'asyncTick',
    value: function asyncTick(resolve, reject) {
      const _this = this

      if (this.plugin >= this.processor.plugins.length) {
        this.processed = true
        return resolve()
      }

      try {
        (function () {
            const plugin = _this.processor.plugins[_this.plugin]
            const promise = _this.run(plugin)
            _this.plugin += 1

            if (isPromise(promise)) {
              promise.then(() => {
                _this.asyncTick(resolve, reject)
              }).catch((error) => {
                _this.handleError(error, plugin)
                _this.processed = true
                reject(error)
              })
            } else {
              _this.asyncTick(resolve, reject)
            }
          }())
      } catch (error) {
          this.processed = true
          reject(error)
        }
    },
  }, {
    key: 'async',
    value: function async() {
      const _this2 = this

      if (this.processed) {
          return new Promise((resolve, reject) => {
            if (_this2.error) {
              reject(_this2.error)
            } else {
              resolve(_this2.stringify())
            }
          })
        }
      if (this.processing) {
          return this.processing
        }

      this.processing = new Promise((resolve, reject) => {
          if (_this2.error) return reject(_this2.error)
          _this2.plugin = 0
          _this2.asyncTick(resolve, reject)
        }).then(() => {
          _this2.processed = true
          return _this2.stringify()
        })

      return this.processing
    },
  }, {
    key: 'sync',
    value: function sync() {
        const _this3 = this

        if (this.processed) return this.result
        this.processed = true

        if (this.processing) {
          throw new Error('Use process(css).then(cb) to work with async plugins')
        }

        if (this.error) throw this.error

        this.result.processor.plugins.forEach((plugin) => {
          const promise = _this3.run(plugin)
          if (isPromise(promise)) {
            throw new Error('Use process(css).then(cb) to work with async plugins')
          }
        })

        return this.result
      },
  }, {
      key: 'run',
      value: function run(plugin) {
        this.result.lastPlugin = plugin

        try {
          return plugin(this.result.root, this.result)
        } catch (error) {
          this.handleError(error, plugin)
          throw error
        }
      },
    }, {
      key: 'stringify',
      value: function stringify() {
        if (this.stringified) return this.result
        this.stringified = true

        this.sync()

        const opts = this.result.opts
        let str = _stringify3.default
        if (opts.syntax) str = opts.syntax.stringify
        if (opts.stringifier) str = opts.stringifier
        if (str.stringify) str = str.stringify

        let result = ''
        str(this.root, (i) => {
          result += i
        })
        this.result.css = result

        return this.result
      },
    }, {
      key: 'processor',
      get: function get() {
        return this.result.processor
      },

        /**
         * Options from the {@link Processor#process} call.
         * @type {processOptions}
         */

    }, {
      key: 'opts',
      get: function get() {
        return this.result.opts
      },

        /**
         * Processes input CSS through synchronous plugins, converts `Root`
         * to a CSS string and returns {@link Result#css}.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {string}
         * @see Result#css
         */

    }, {
      key: 'css',
      get: function get() {
        return this.stringify().css
      },

        /**
         * An alias for the `css` property. Use it with syntaxes
         * that generate non-CSS output.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {string}
         * @see Result#content
         */

    }, {
      key: 'content',
      get: function get() {
        return this.stringify().content
      },

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#map}.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {SourceMapGenerator}
         * @see Result#map
         */

    }, {
      key: 'map',
      get: function get() {
        return this.stringify().map
      },

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#root}.
         *
         * This property will only work with synchronous plugins. If the processor
         * contains any asynchronous plugins it will throw an error.
         *
         * This is why this method is only for debug purpose,
         * you should always use {@link LazyResult#then}.
         *
         * @type {Root}
         * @see Result#root
         */

    }, {
      key: 'root',
      get: function get() {
        return this.sync().root
      },

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#messages}.
         *
         * This property will only work with synchronous plugins. If the processor
         * contains any asynchronous plugins it will throw an error.
         *
         * This is why this method is only for debug purpose,
         * you should always use {@link LazyResult#then}.
         *
         * @type {Message[]}
         * @see Result#messages
         */

    }, {
      key: 'messages',
      get: function get() {
        return this.sync().messages
      },
    }])

  return LazyResult
}())

exports.default = LazyResult
module.exports = exports.default
