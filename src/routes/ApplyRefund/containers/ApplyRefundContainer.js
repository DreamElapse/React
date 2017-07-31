import { connect } from 'react-redux'
import { load, loadAsync } from '../modules/applyRefundView'

import ApplyRefundView from '../components/ApplyRefundView'

const mapDispatchToProps = {
    load : () => load(1),
    loadAsync
}

const mapStateToProps = (state) => ({
    applyRefund : state.applyRefund
})

export default connect(mapStateToProps,mapDispatchToProps)(ApplyRefundView)