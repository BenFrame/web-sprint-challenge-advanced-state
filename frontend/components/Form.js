import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { inputChange, resetForm, postQuiz } from '../state/action-creators'
import * as yup from 'yup' 
import axios from 'axios'

const formSchema  = yup.object().shape({
  questionText: yup.string()
  .required('question is required')
  .min(1,),
  trueAnswerText: yup.string()
  .required('true answer required')
  .min(1,), 
  falseAnswerText: yup.string()
  .required('false answer required')
  .min(1,)
})

function Form(props) {
  const{inputChange, resetForm } = props

  const onChange = evt => {
    let {value} = evt.target
    yup.reach(formSchema).validate(value)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    axios.post('http://localhost:9000/api/quiz/new')
    .then()
    .catch()
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn"disabled={formSchema}>Submit new quiz</button>
    </form>
  )
}
const mapStateToProps = (state) => {
  return ({
   questionText: state,
   trueAnswerText: state,
   falseAnswerText: state,  

  })
}

export default connect(mapStateToProps,{inputChange, resetForm})(Form)
