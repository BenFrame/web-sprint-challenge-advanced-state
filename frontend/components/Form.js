import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import {resetForm, postQuiz, inputChange } from '../state/action-creators'
import * as yup from 'yup' 




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
  const{resetForm, questionText, trueAnswerText, falseAnswerText, inputChange, postQuiz } = props

  const onChange = evt => {
    let {value, id} = evt.target
    console.log(value)
    // formSchema.isValid(value)
    inputChange( { [id]: value } );
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz(questionText, trueAnswerText, falseAnswerText)
    
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value={questionText} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} value={trueAnswerText} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} value={falseAnswerText} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" type='submit' disabled={ ! ( questionText.length > 1 && trueAnswerText.length > 1 && falseAnswerText.length > 1 ) }>Submit new quiz</button>
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
    resetForm: () => dispatch(resetForm()),
    inputChange: (string) => dispatch(inputChange(string)),
    postQuiz: (questionText, trueAnswerText, falseAnswerText) => dispatch(postQuiz(questionText, trueAnswerText, falseAnswerText))
  })
}
export default connect(mapStateToProps,mapDispatchToProps)(Form)
