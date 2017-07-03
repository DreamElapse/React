
export default (store) => ({

    path:'appraise',

    getComponent (nextState, cb) {
        require.ensure([],(require) => {

            const Appraise = require('./components/AppraiseView').default

            cb(null, Appraise)
        },'appraise')
    }
})