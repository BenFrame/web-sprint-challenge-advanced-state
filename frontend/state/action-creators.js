// ❗ You don't need to add extra action creators to achieve MVP
import { 
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE,
  INPUT_CHANGE,
  RESET_FORM } from "./action-types"
  import axios from "axios"

export function moveClockwise() { 
  return({type: MOVE_CLOCKWISE})
}

export function moveCounterClockwise() {
  return({type:MOVE_COUNTERCLOCKWISE})
 }

export function selectAnswer(answerId) {
  return({type:SET_SELECTED_ANSWER, payload: answerId})
 }

export function setMessage(message) { 
  return({type:SET_INFO_MESSAGE, payload: message})
}

export function setQuiz( quizData ) {
  return({type:SET_QUIZ_INTO_STATE, payload: quizData })
 }

export function inputChange(string) {
  return({type:INPUT_CHANGE, payload: string})
 }

export function resetForm() {
  return({type:RESET_FORM})
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    return axios.get("http://localhost:9000/api/quiz/next")
      .then(( response ) => {
        console.log( response.data )
        dispatch(setQuiz(response.data))
        dispatch(selectAnswer(''))
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    return axios.post("http://localhost:9000/api/quiz/answer",{
      quiz_id: quizId,
      answer_id: answerId

    })
    .then((response)=>{
      console.log(response)
      dispatch(setMessage(response.data.message))
      dispatch(fetchQuiz())
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(questionText, trueAnswerText, falseAnswerText) {
  return function (dispatch) {
    return axios.post('http://localhost:9000/api/quiz/new',{
      question_text: questionText, 
      true_answer_text: trueAnswerText, 
      false_answer_text: falseAnswerText
    })
    .then((response) => {
      dispatch(response)
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
