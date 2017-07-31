import { connect } from 'react-redux'
import { load, loadAsync } from '../modules/applyServiceView'

import ApplyServiceView from '../components/ApplyServiceView'

const mapDispatchToProps = {
    load : () => load(1),
    loadAsync
}

const mapStateToProps = (state) => ({
    applyService : state.applyService
})

export default connect(mapStateToProps,mapDispatchToProps)(ApplyServiceView)