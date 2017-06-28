// Sync route definition
export default () => ({
  path : 'CountryLanguage',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const CountryLanguage = require('./components/CountryLanguageView').default

      /*  Return getComponent   */
      cb(null, CountryLanguage)

      /* Webpack named bundle   */
    }, 'CountryLanguage')
  }
})
