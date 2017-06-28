import { connect } from 'react-redux'
import { getCmsAd, getSwitches } from '../modules/homeView.js'
import { fetchAirPortData } from 'store/airPortData'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import HomeView from '../components/HomeView'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational layout. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  getCmsAd,
  getSwitches
}

const mapStateToProps = (state) => ({
  cmsAd: state.homeData.cmsAd,
  switches: state.homeData.switches,
  airPortData: state.airPortData
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
