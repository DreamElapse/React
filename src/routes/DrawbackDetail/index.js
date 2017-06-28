
export default (store) => ({
    path:'drawbackdetail',

    getComponent (nextState, cb) {
        require.ensure([],(require) => {
            
            const DrawbackDetail = require('./components/DrawbackView').default

            cb(null, DrawbackDetail)
        }, 'drawbackdetail')
    }

})