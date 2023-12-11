import React, { useEffect } from 'react'
import { selectAnswer, setQuiz, setMessage, fetchQuiz } from '../state/action-creators'
import {connect} from 'react-redux'
import axios from 'axios'

function Quiz(props) {
  const {selectedAnswer, setQuiz, setMessage, fetchQuiz, answers, question, } = props;

  // console.log( answers );

  // the functional component version of componentDidMount(){}
  useEffect( () => {
    fetchQuiz();
  }, [] );

  function onClick(evt) {
    const answers = evt.target
    console.log(answers)
     
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        question ? (
          <>
            <h2>{ question }</h2>
              
            <div id="quizAnswers">
              <div className= "answer selected">
                {answers[0]?.text}
                <button onClick={onClick}>
                  {selectedAnswer === 0 ? "Selected" : "Select"}
                </button>
              </div>

              <div className="answer">
              {answers[1]?.text}
                <button onClick={onClick}>
                {selectedAnswer === 1 ? "Selected" : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
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
  })
}
export default connect(mapStateToProps,{selectAnswer,setQuiz,setMessage,fetchQuiz})(Quiz);
