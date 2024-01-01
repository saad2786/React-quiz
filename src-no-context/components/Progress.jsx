import React from 'react'

export default function Progress({
  index,
  numQuestions,
  points,
  totalPossiblePoints,
  answer,
}) {
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