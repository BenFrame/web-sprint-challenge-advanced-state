import React from 'react'
import { setMessage } from '../state/action-creators'
import { connect } from 'react-redux'

function Message(props) {
  const{setMessage, infoMessage} = props
  return <div id="message">{infoMessage}</div>
}
const mapStateToProps = (state) => {
  return({
      infoMessage: state.infoMessage
  })
}
export default connect(mapStateToProps,{setMessage})(Message);