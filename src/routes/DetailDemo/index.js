import { injectReducer } from '../../store/reducers'

export default (store) => ({

    path:'detaildemo',

    getComponent (nextState,cb) {
        require.ensure([],(require) => {

            const DetailView = require('./containers/DetailViewContainer').default
            const reducer = require('./modules/detailView').default

            injectReducer(store,{key:'detailDemo', reducer })

            cb(null, DetailView)
        },'detaildemo')
    }
})
