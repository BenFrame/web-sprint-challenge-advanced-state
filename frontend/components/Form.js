import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import {resetForm, postQuiz, inputChange } from '../state/action-creators'
import * as yup from 'yup' 
import axios from 'axios'

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}

const formSchema  = yup.object().shape({
  questionText: yup.string()
  .required('question is required')
  .min(1,'to short'),
  trueAnswerText: yup.string()
  .required('true answer required')
  .min(1,'to short'), 
  falseAnswerText: yup.string()
  .required('false answer required')
  .min(1,'to short')
})

function Form(props) {
  const{resetForm, questionText, trueAnswerText, falseAnswerText } = props

  const onChange = evt => {
    let {value, id} = evt.target
    console.log(value)
    formSchema.isValid(value)
    .then( (stuff) => console.log( stuff ))
  }

  const onSubmit = evt => {
    evt.preventDefault()
    axios.post('http://localhost:9000/api/quiz/new')
    .then((res) => {
      dispatchEvent(postQuiz, (res.data))
      
    })
    
  }

  return (
    <form id="form" >
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value={questionText} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" onSubmit={onSubmit} disabled={initialFormState}>Submit new quiz</button>
    </form>
  )
}
const mapStateToProps = (state) => {
  return ({
   questionText: state.form.newQuestion,
   trueAnswerText: state.form.newTrueAnswer,
   falseAnswerText: state.form.newFalseAnswer,  

  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    resetForm: (string) => dispatch(resetForm(string)),
    inputChange: (string) => dispatch(inputChange(string))
  })
}
export default connect(mapStateToProps,mapDispatchToProps)(Form)
