import { injectReducer } from '../../../../store/reducers'
import config from '../../config/routerConfig'
export default (store) => ({
  path : config.counterB.path,
    /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter = require('./containers/CounterContainer').default
      const reducer = require('./modules/counter').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'counterB', reducer })

      /*  Return getComponent   */
      cb(null, Counter)

    /* Webpack named bundle   */
    }, 'counterB')
  }
})
