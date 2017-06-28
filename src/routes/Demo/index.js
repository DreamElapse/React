
export default (store) => ({

    path:'demo',

    getComponent (nextState,cb) {
        require.ensure([],(require) => {

            const Demo = require('./components/DemoComponent').default



            cb(null, Demo)
        },'demo')
    }
})