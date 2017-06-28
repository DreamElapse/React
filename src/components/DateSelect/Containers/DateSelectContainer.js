import { connect } from 'react-redux'
// import {fetchFlightLowestPrice} from 'store/flightLowestPriceData'

import DateSelect from '../components/DateSelect'

const mapDispatchToProps = {
  // fetchFlightLowestPrice
}

const mapStateToProps = (state) => ({
  // flightLowestPriceData: state.flightLowestPriceData
})

export default connect(mapStateToProps, mapDispatchToProps)(DateSelect)

