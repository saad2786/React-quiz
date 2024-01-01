import React from 'react'
import Option from './Option'

export default function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}
