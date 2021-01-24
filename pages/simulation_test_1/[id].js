
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import contents from '../../contents/simulation_test_1.json'
import { Button, Modal } from 'react-bootstrap'

const QuestionDetail = ({ question, answerOptions }) => {
  const router = useRouter()

  // modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const initialState = {
    answer: '',
    correct: false,
    message: '',
    checkedList: [],
  }
  const [answer, setAnswer] = useState(initialState)

  const answerText = () => {
    return answer.correct ? "よくできました!" : "不正解です。もう一度確かめてください。"
  }
  const noteText = () => {
    return (question.type === 'radio') ? "選択項目を選択してください" : `${question.num_checkboxions}つ選択してください`
  }

  const unCheck = () => {
    for (const element of document.getElementsByName(question.type)) {
      element.checked = false;
    }
  }

  const handleChange = e => {
    if (question.type === 'radio') {
      setAnswer({ ...answer, answer: e.target.value.toString() })
    } else {
      const element = document.getElementsByName(question.type)
      const checked = Array.prototype.filter.call(element, value => value.checked)
      const checkedList = checked.map(item => item.value)
      setAnswer({ ...answer, checkedList })
    }
  }

  const answerCheck = () => {
    let correct, message
    let content = answerOptions.find((value) => (value.option_id == answer.answer))
    if (question.type === 'checkbox') {
      content = answerOptions.filter((value) => value.correct === true)
      const answerArray = content.map((value) => value.option_id.toString())
      content.correct = (answer.checkedList.toString() === answerArray.toString()) ? true : false
      const messageArray = answerOptions.filter((value) => answer.checkedList.includes(value.option_id.toString()))
      const messageString = messageArray.map((value) => value.message)
      content.message = messageString.join("\n")
    }
    if (!answer.answer && answer.checkedList.length === 0) {
      return handleShow()
    }
    if (question.type === 'checkbox' && answer.checkedList.length != question.num_checkboxions) {
      return handleShow()
    }
    correct = content.correct
    message = content.message

    setAnswer({ ...answer, correct, message })
  }

  const handleClick = e => {
    e.preventDefault()
    answerCheck()
  }

  const questionSize = () => {
    return contents.question.length
  }

  const setStorage = () => {
    const content = answerOptions.find((value) => (value.option_id == answer.answer))
    // set storage
    const storageName = `simulation_test_1`
    const storageObject = JSON.parse(localStorage.getItem(storageName))
    const page = question.id - 1
    if (!!storageObject && storageObject.length > 0) {
      storageObject[page].answer = !content ? false : content.correct
      localStorage.setItem(storageName, JSON.stringify(storageObject), { secure: false })
    }
  }

  const nextLink = e => {
    e.preventDefault()
    setStorage()
    unCheck()
    setAnswer(initialState)
    router.push(`/simulation_test_1/${question.id + 1}`)
  }

  const resultLink = e => {
    e.preventDefault()
    setStorage()
    unCheck()
    setAnswer(initialState)
    router.push(`/simulation_test_1/result`)
  }

  return (
    <Layout title={question ? `問題:${question.id}` : ''}>
      <h1 className="h1">問題:{question.id}</h1>
      <p>{question.question_text}</p>
      {answerOptions.map((answer) => (
        <div className="form-check py-1" key={answer.option_id}>
          <input className="form-check-input" type={question.type} name={question.type} value={answer.option_id} id={`flex${answer.option_id}`} onChange={handleChange} />
          <label className="form-check-label w-100" htmlFor={`flex${answer.option_id}`}>
            {answer.option_id}. {answer.answer_text}
          </label>
        </div>
      ))}
      {answer.message ? (<>
        <div className={'p-3 m-2 message ' + (answer.correct ? "bg-info" : "bg-danger text-white")}>
          <h5>{answerText()}</h5>
          {answer.message}
        </div>
      </>) : (<></>)}
      <div className="text-center my-3">
        <button type="button" className="btn btn-success mx-2" onClick={handleClick}>解答を確認する</button>
        {questionSize() != question.id ? (<>
          <button type="button" className="btn btn-primary mx-2" onClick={nextLink}>次へ</button>
        </>) : (<>
          <button type="button" className="btn btn-primary mx-2" onClick={resultLink}>結果確認</button>
        </>)}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title><i className="bi bi-exclamation-triangle-fill me-2 text-warning"></i>注意</Modal.Title>
        </Modal.Header>
        <Modal.Body>{noteText()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <i className="bi bi-x-square"></i>
          </Button>
        </Modal.Footer>
      </Modal>
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
