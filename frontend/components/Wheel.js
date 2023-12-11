import React from 'react'
import { moveClockwise, moveCounterClockwise, } from '../state/action-creators'
import {connect} from 'react-redux'


function Wheel(props) {
  const {moveClockwise, moveCounterClockwise, activeWheelIndex } = props
  
  console.log( props.activeWheelIndex );

  const handleClickClockwise = () => {
    moveClockwise()
  }
  const handleClickCounterClockwise = () => {
    moveCounterClockwise()
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        {/* { [0, 1, 2, 3, 4, 5].map( index => (
          <div className={ activeWheelIndex === index ? 'cog active' : 'cog' } style={{ "--i": index }} key={index}>
            { activeWheelIndex === index && 'B'}
          </div> 
        ))} */}
        <div className={ activeWheelIndex === 0 ? 'cog active' : 'cog' } style={{ "--i": 0 }}>{ activeWheelIndex === 0 && 'B'}</div>
        <div className={ activeWheelIndex === 1 ? 'cog active' : 'cog' } style={{ "--i": 1 }}>{ activeWheelIndex === 1 && 'B'}</div>
        <div className={ activeWheelIndex === 2 ? 'cog active' : 'cog' } style={{ "--i": 2 }}>{ activeWheelIndex === 2 && 'B'}</div>
        <div className={ activeWheelIndex === 3 ? 'cog active' : 'cog' } style={{ "--i": 3 }}>{ activeWheelIndex === 3 && 'B'}</div>
        <div className={ activeWheelIndex === 4 ? 'cog active' : 'cog' } style={{ "--i": 4 }}>{ activeWheelIndex === 4 && 'B'}</div>
        <div className={ activeWheelIndex === 5 ? 'cog active' : 'cog' } style={{ "--i": 5 }}>{ activeWheelIndex === 5 && 'B'}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick = { handleClickCounterClockwise } >Counter clockwise</button>
        <button id="clockwiseBtn" onClick = { handleClickClockwise }>Clockwise</button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return ({
    activeWheelIndex: state.wheel
  })
}
export default connect(mapStateToProps,{moveClockwise,moveCounterClockwise})(Wheel);
