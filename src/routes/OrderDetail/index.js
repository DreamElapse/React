import { injectReducer } from '../../store/reducers'

export default (store) => ({

    path:'orderdetail',

    getComponent (nextState, cb) {
        require.ensure([],(require) => {

            const OrderDetailContainer = require('./containers/OrderDetailContainer').default
            const reducer = require('./modules/orderDetailView').default

            injectReducer(store,{key:'OrderDetail',reducer})

            cb(null, OrderDetailContainer)
        },'orderDetail')
    }
})