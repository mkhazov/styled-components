

Object.defineProperty(exports, '__esModule', {
  value: true,
})
Object.defineProperty(module.exports, 'babelPluginFlowReactPropTypes_proptype_Broadcast', require('react').PropTypes.shape({
  publish: require('react').PropTypes.func.isRequired,
  subscribe: require('react').PropTypes.func.isRequired,
}))
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

const createBroadcast = function createBroadcast(initialValue) {
  let listeners = []
  let currentValue = initialValue

  return {
    publish: function publish(value) {
      currentValue = value
      listeners.forEach((listener) => {
        return listener(currentValue)
      })
    },
    subscribe: function subscribe(listener) {
      listeners.push(listener)

      // Publish to this subscriber once immediately.
      listener(currentValue)

      return function () {
        listeners = listeners.filter((item) => {
          return item !== listener
        })
      }
    },
  }
}

exports.default = createBroadcast
module.exports = exports.default
