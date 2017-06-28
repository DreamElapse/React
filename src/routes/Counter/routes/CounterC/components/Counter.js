import React from 'react'
import NavBar  from 'components/Header';

export const Counter = (props) => (
  <div style={{ margin: '0 auto' }} >
    <NavBar title="Counter"></NavBar>
  counterC
    {' '}
    {props.counter}
    <button onClick={() => { props.locationChange("#/counter") }}>location</button>
</div>
)

Counter.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default Counter
