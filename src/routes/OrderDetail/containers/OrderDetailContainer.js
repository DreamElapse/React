import { connect } from 'react-redux'
import { load, loadAsync } from '../modules/orderDetailView'

import OrderDetailView from '../components/OrderDetailView'

const mapDispatchToProps = {
    load : () => load(1),
    loadAsync
}

const mapStateToProps = (state) => ({
    orderDetail : state.orderDetail
})

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetailView)