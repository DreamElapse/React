import { injectReducer } from '../../store/reducers'

export default (store) => ({

    path:'applyservice',

    getComponent (nextState, cb) {
        require.ensure([],(require) => {

            const ApplyServiceContainer = require('./containers/ApplyServiceContainer').default
            const reducer = require('./modules/applyServiceView').default

            injectReducer(store,{key:'applyService',reducer})

            cb(null, ApplyServiceContainer)
        },'applyService')
    }
})