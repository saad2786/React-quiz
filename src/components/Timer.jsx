import { useEffect } from 'react'
import { useQuiz } from '../context/QuizContext'

export default function Timer() {
  const { dispatch, remainingSeconds } = useQuiz()
  const min = Math.floor(remainingSeconds / 60)
  const sec = remainingSeconds % 60
  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [dispatch])

  return (
    <div className="timer">
      {min < 10 && '0'}
      {min} : {sec}
    </div>
  )
}
