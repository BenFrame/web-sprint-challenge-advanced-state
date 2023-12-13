import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import {resetForm, postQuiz, inputChange } from '../state/action-creators'
import * as yup from 'yup' 


const formInit = {
  questionText: '',
  trueAnswerText: '', 
  falseAnswerText: '',
}

const formSchema  = yup.object().shape({
  questionText: yup.string()
  .min(2,'too short')
  .required('question is required'),
  trueAnswerText: yup.string()
  .min(2,'too short') 
  .required('true answer required'),
  falseAnswerText: yup.string()
  .min(2,'too short')
  .required('false answer required')
})




function Form(props) {
  const{questionText, trueAnswerText, falseAnswerText, inputChange, postQuiz } = props
  let [canSubmit, setCanSubmit] = useState(false)

  useEffect(()=> {
    formSchema.isValid({questionText: questionText.trim(), trueAnswerText: trueAnswerText.trim(), falseAnswerText: falseAnswerText.trim()}).then(setCanSubmit)
  },[questionText, trueAnswerText, falseAnswerText])

  const onChange = evt => {
    let {value, id} = evt.target
    // console.log(value)
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
      <button id="submitNewQuizBtn" type='submit' disabled={ ! canSubmit }>Submit new quiz</button>
    </form>
  )
}
const mapStateToProps = (state) => {
  return ({
   questionText: state.form.newQuestion,
   trueAnswerText: state.form.newTrueAnswer,
   falseAnswerText: state.form.newFalseAnswer,  
    // canSubmit: state.form.isValid,
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
