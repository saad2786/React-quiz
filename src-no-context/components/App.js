import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton.jsx'
import Progress from './Progress.jsx'
import Finish from './Finish.jsx'
import Footer from './Footer'
import Timer from './Timer'

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

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState)

  const totalPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  )
  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              totalPossiblePoints={totalPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={questions.length}
              />
            </Footer>
          </>
        )}
        {status === 'finish' && (
          <Finish
            points={points}
            totalPossiblePoints={totalPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}
