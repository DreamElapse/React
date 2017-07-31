import { injectReducer } from '../../store/reducers'

export default (store) => ({

    path:'applyrefund',

    getComponent (nextState, cb) {
        require.ensure([],(require) => {

            const ApplyRefundContainer = require('./containers/ApplyRefundContainer').default
            const reducer = require('./modules/applyRefundView').default

            injectReducer(store,{key:'applyRefund',reducer})

            cb(null, ApplyRefundContainer)
        },'applyRefund')
    }
})