
export default (store) => ({
    path:'refunddetail',

    getComponent (nextState, cb) {
        require.ensure([],(require) => {
            
            const RefundView = require('./components/RefundView').default

            cb(null, RefundView)
        }, 'refundview')
    }

})