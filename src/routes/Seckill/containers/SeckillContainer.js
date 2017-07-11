import { connect } from 'react-redux'
import { load, loadAsync } from '../modules/seckillView'

import SeckillView from '../components/SeckillView'

const mapDispatchToProps = {
    load : () => load(1),
    loadAsync
}

const mapStateToProps = (state) => ({
    seckil : state.seckill
})

export default connect(mapStateToProps,mapDispatchToProps)(SeckillView)