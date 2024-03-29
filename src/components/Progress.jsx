import React from 'react'
import { useQuiz } from '../context/QuizContext'

export default function Progress() {
  const { index, questions, points, answer, totalPossiblePoints } = useQuiz()
  const numQuestions = questions.length
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/ {totalPossiblePoints} points
      </p>
    </header>
  )
}
