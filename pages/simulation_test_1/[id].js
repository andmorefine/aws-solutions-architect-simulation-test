
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/simulation_test_1.json'

const QuestionDetail = ({ question, answerOptions }) => {
  const router = useRouter()

  const state = {
    answer: '',
    correct: false,
    message: '',
  }
  const [answer, setAnswer] = useState(state)

  const answerText = () => {
    return answer.correct ? "よくできました!" : "不正解です。もう一度確かめてください。"
  }

  const handleChange = e => {
    setAnswer({...answer, answer: e.target.value.toString()})
  }

  const answerCheck = () => {
    const content = answerOptions.find((value) => (value.option_id == answer.answer))
    if (!content) return false

    setAnswer({
      ...answer,
      correct: content.correct,
      message: content.message,
    })
  }

  const handleClick = e => {
    e.preventDefault()
    answerCheck()
  }

  const nextLink = () => {
    setAnswer({...answer,
      answer: '',
      correct: false,
      message: '',
    })
    router.push(`/simulation_test_1/${question.id + 1}`)
  }

  return (
    <Layout title={question ? `問題${question.id}` : ''}>
      <h1>問題{question.id}</h1>
      <p>{question.question_text}</p>
      {answerOptions.map((answer) => (
        <div className="form-check" key={answer.option_id}>
          <input className="form-check-input" type="radio" name={`radio${answer.question_id}`} value={answer.option_id} id={`flexRadio${answer.option_id}`} onChange={handleChange} />
          <label className="form-check-label" htmlFor={`flexRadio${answer.option_id}`}>
            {answer.answer_text}
          </label>
        </div>
      ))}
      {answer.message ? (<>
        <div className={answer.correct ? "p-3 m-2 bg-info" : "p-3 m-2 bg-danger text-white"}>
          <h5>{answerText()}</h5>
          {answer.message}
        </div>
      </>) : (<></>)}
      <div className="text-center my-3">
        <button type="button" className="btn btn-success mx-2" onClick={handleClick}>解答を確認する</button>
        {answer.correct ? (<>
          <button type="button" className="btn btn-primary mx-2" onClick={nextLink}>次へ</button>
        </>) : (<></>)}
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const paths = contents.question.map((value) => ({
    params: { id: value.id.toString() },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {  
  const question = contents.question.find((value) => (value.id == params.id))
  const question_id = question.id
  const answerOptions = contents.answer_options.filter((value) => (value.question_id == question_id))
  return { props: { question, answerOptions } }
}

export default QuestionDetail
