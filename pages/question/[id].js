
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/question_index.json'

const QuestionDetail = ({ question }) => {
  const detail = question[0]
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
    const content = detail.answer_list.filter((value) => (value.id == answer.answer))
    
    setAnswer({
      ...answer,
      correct: content[0].correct,
      message: content[0].message
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
    router.push(`/question/${detail.id + 1}`)
  }

  return (
    <Layout title={detail ? `問題${detail.id}` : ''}>
      <h1>問題{detail.id}</h1>
      <p>{detail.question_text}</p>
      {detail.answer_list.map((answer) => (
        <div className="form-check" key={answer.id}>
          <input className="form-check-input" type="radio" name="radio" value={answer.id} id={`flexRadio${answer.id}`} onChange={handleChange} />
          <label className="form-check-label" htmlFor={`flexRadio${answer.id}`}>
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
  const paths = contents.map((value) => ({
    params: { id: value.id.toString() },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {  
  const question = contents.filter((value) => (value.id == params.id))
  return { props: { question } }
}

export default QuestionDetail
