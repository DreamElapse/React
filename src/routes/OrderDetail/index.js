
export default (store) => ({

    path:'orderdetail',

    getComponent (nextState, cb) {
        require.ensure([],(require) => {
            
            const OrderDetail = require('./components/OrderDetailView').default

            cb(null, OrderDetail)
        }, 'orderdetail')
    }
})