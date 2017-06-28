import { defaultEnterEvents } from 'util/enter.util'
import { injectReducer } from '../../store/reducers'
import CounterA from './routes/CounterA'
import CounterB from './routes/CounterB'
import CounterC from './routes/CounterC'
export default (store) => ({
  path : 'counter',
  // 按照跟路由的写法 写component容器和indexRoute默认路由
  indexRoute  : CounterA(store),
  onEnter(nextState, replace, wrappedNext) {
    /**
     * 添加模块中国际化文件
     *
     * add i18n text
     * */
    const locale = require('./i18n/index').default;
    defaultEnterEvents(nextState, replace, wrappedNext, locale);
  },
  /**
   * 创建子路由
   *
   * create childRoutes
   * */
  childRoutes : [
    // CounterA(store),
    CounterB(store),
    CounterC(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const layout = require('./layout/layout').default;

      /*  Return getComponent   */
      cb(null, layout)

    /* Webpack named bundle   */
    }, 'counter')
  }
})
