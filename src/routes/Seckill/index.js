import { injectReducer } from '../../store/reducers'

export default (store) => ({

    path:'seckill',

    getComponent (nextStte, cb) {
        require.ensure([],(require) => {

            const SeckillContainer = require('./containers/SeckillContainer').default
            const reducer = require('./modules/seckillView').default

            injectReducer(store,{key:'seckill',reducer})

            cb(null, SeckillContainer)
        },'seckill')
    }
})