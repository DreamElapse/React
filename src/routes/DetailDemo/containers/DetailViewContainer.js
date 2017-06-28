import { connect } from 'react-redux'
import { detail , detailAsync } from '../modules/detailView.js'

import DetailView from '../components/DetailView'

const mapDispatchToProps = {
    detail: () => detail(1),
    detailAsync
}

const mapStateToProps = (state) => ({
    a :state.detailDemo.a,
    b :state.detailDemo.b
})

export default connect(mapStateToProps,mapDispatchToProps)(DetailView)