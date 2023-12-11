// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { 
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM } from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type){
    case(MOVE_CLOCKWISE):{
      const nextIndex = (state + 1) % 6;
      return nextIndex
    }
    case(MOVE_COUNTERCLOCKWISE):{
      const nextIndex = (state + 5) % 6;
      return nextIndex
    }
    default:
      return state;
  }
}

const initialQuizState = { answers: [], question: '', quiz_id: '' }
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case(SET_QUIZ_INTO_STATE):{
      const { answers, question, quiz_id } = action.payload;
      // return action.payload;
      return { ...state, answers, question, quiz_id }
    }
    default:
      return state;
  }
}

const initialSelectedAnswerState = {Select:'Select'}
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case(SET_SELECTED_ANSWER):{
      return 'Selected'

      
    }
    default:
      return state;
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case(SET_INFO_MESSAGE):{
      return {
        ...state, 

      }
    }
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case(RESET_FORM):{
      return {
        ...state, 

      }
    }
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
