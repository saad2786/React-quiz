import { useContext, useEffect } from 'react'
import { createContext } from 'react'
import { useReducer } from 'react'

const SECS_PER_QUESTIONS = 30
const initialState = {
  questions: [],
  //'loading','error','ready','active','finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingSeconds: null,
}
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }
    case 'start':
      return {
        ...state,
        status: 'active',
        remainingSeconds: state.questions.length * SECS_PER_QUESTIONS,
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'finished':
      return {
        ...state,
        status: 'finish',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      }
    case 'tick':
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? 'finish' : state.status,
      }
    default:
      throw new Error('Action Unknown')
  }
}

const QuizContext = createContext()

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState)
  const totalPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  )
  const numQuestions = questions.length
  useEffect(
    function () {
      fetch('http://localhost:8000/questions')
        .then((res) => res.json())
        .then((data) => dispatch({ type: 'dataReceived', payload: data }))
        .catch((err) => dispatch({ type: 'dataFailed' }))
    },
    [dispatch],
  )
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        remainingSeconds,
        totalPossiblePoints,
        numQuestions,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error('context was used outside of Provider')
  return context
}

export { QuizProvider, useQuiz }
