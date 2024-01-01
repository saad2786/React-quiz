import React from 'react'

export default function Finish({
  points,
  totalPossiblePoints,
  highScore,
  dispatch,
}) {
  const percent = (points / totalPossiblePoints) * 100
  let emoji
  if (percent === 100) emoji = '🥇'
  if (percent >= 80 && percent < 100) emoji = '🥳'
  if (percent >= 50 && percent < 80) emoji = '🙃'
  if (percent >= 0 && percent < 50) emoji = '🤨'
  if (percent === 0) emoji = '🤦‍♂️'
  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points} </strong>out of{' '}
        {totalPossiblePoints} ({Math.ceil(percent)}%)
      </p>
      <p className="highscore">
        ( High Score: <strong>{highScore}</strong> points )
      </p>

      <button
        className="btn btn-ui restart"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz!
      </button>
    </>
  )
}
