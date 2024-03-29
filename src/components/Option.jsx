import React from 'react'
import { useQuiz } from '../context/QuizContext'

export default function Option() {
  const { questions, dispatch, answer, index } = useQuiz()
  const question = questions[index]
  const hasAnswered = answer !== null
  return (
    <div className="options">
      {question.options.map(function (option, index) {
        return (
          <button
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              hasAnswered
                ? index === question.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={option}
            onClick={() =>
              answer === null &&
              dispatch({
                type: 'newAnswer',
                payload: index,
              })
            }
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
