
export default (store) => ({

    path:'logistics',

    getComponent (nextState, cb) {
        require.ensure([],(require) => {
            
            const LogisticsView = require('./components/LogisticsView').default

            

            cb(null, LogisticsView)
        }, 'logistics')
    }
})