import React from 'react'

export default function Option({ question, dispatch, answer }) {
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
