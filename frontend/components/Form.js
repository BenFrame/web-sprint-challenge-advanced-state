import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { inputChange, resetForm } from '../state/action-creators'

function Form(props) {
  const{inputChange, resetForm } = props

  const onChange = evt => {

  }

  const onSubmit = evt => {

  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}
const mapStateToProps = (state) => {
  return ({
    
  })
}

export default connect(mapStateToProps,{inputChange, resetForm})(Form)
