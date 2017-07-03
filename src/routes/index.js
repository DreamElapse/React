// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import Counter from './Counter'
import CountryLanguageRoute from './CountryLanguage'
import { defaultEnterEvents } from 'util/enter.util';
import DetailDemo from './DetailDemo';  //第一个demo   
import Demo from './Demo' ;   //第二个demo
import Logistics from './Logistics';  // 查看物流
import OrderDetail from './OrderDetail';  // 订单详情
import RefundDetail from './RefundDetail';  // 退款详情
import Appraise from './Appraise';  // 商品评价
import Mycollect from './Mycollect';  // 我的收藏

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home(store),
  onEnter(nextState, replace, wrappedNext) {
    /**
     * add i18n
     * */
    const locale = require('../i18n/index').default;
    defaultEnterEvents(nextState, replace, wrappedNext, locale);
  },
  childRoutes : [
    Counter(store),
    CountryLanguageRoute(store),
    DetailDemo(store),
    Demo(store),
    Logistics(store),
    OrderDetail(store),
    RefundDetail(store),
    Appraise(store),
    Mycollect(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
