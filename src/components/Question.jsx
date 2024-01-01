import React from 'react'
import { useQuiz } from '../context/QuizContext'
import Option from './Option'

export default function Question() {
  const { questions, index } = useQuiz()

  return (
    <div>
      <h3>{questions[index].question}</h3>
      <Option />
    </div>
  )
}
