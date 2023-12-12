import React, { useEffect } from 'react'
import { 
  selectAnswer,  
  setMessage, 
  fetchQuiz, 
  postAnswer } from '../state/action-creators'
import {connect} from 'react-redux'
import axios from 'axios'

function Quiz(props) {
  const {
    selectedAnswer, 
    setMessage, 
    fetchQuiz, 
    answers, 
    question, 
    selectAnswer, 
    postAnswer, 
    quiz_id } = props;

  console.log( selectedAnswer );

  // the functional component version of componentDidMount(){}
  useEffect( () => {
    fetchQuiz();
  }, [] );

  function onClick() {
    postAnswer(quiz_id, selectedAnswer)
    setMessage('')
  }

  const firstAnswerId = answers[0]?.answer_id;
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        question ? (
          <>
            <h2>{ question }</h2>
              
            <div id="quizAnswers">
              <div className= {selectedAnswer === firstAnswerId ? "answer selected" : "answer"}>
                {answers[0]?.text}
                <button onClick={ () => selectAnswer( firstAnswerId )}>
                  {selectedAnswer === firstAnswerId ? "SELECTED" : 'Select'}
                </button>
              </div>

              <div className={selectedAnswer === answers[1]?.answer_id ? "answer selected" : "answer"}>
              {answers[1]?.text}
                <button onClick={ () => selectAnswer( answers[1]?.answer_id )}>
                {selectedAnswer === answers[1]?.answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={onClick} disabled={!selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return ({
    answers: state.quiz.answers,
    question: state.quiz.question,
    quiz_id: state.quiz.quiz_id,
    selectedAnswer: state.selectedAnswer
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    selectAnswer: ( answerId ) => dispatch( selectAnswer( answerId ) ),
    setMessage: (message) => dispatch( setMessage(message) ),
    fetchQuiz: () => dispatch( fetchQuiz() ),
    postAnswer: (quizId, answerId) => dispatch( postAnswer( quizId, answerId))
  })
}
export default connect(mapStateToProps,mapDispatchToProps)(Quiz);
