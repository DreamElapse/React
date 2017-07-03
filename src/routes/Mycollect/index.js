
export default (store) => ({

    path:'mycollect',

    getComponent (nexState, cb) {
        require.ensure([],(require) => {

            const Mycollect = require('./components/MycollectView').default

            cb(null, Mycollect)
        }, 'mycollect')
    }

})