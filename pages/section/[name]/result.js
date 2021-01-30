import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import contents from '../../../contents/section.json'
import { VictoryPie } from "victory"
import { Button } from 'react-bootstrap'

const PageResult = ({ section, question }) => {
  const router = useRouter()

  const [result, setResult] = useState([])
  useEffect(() => {
    const storageName = `section_${section.dirname}`
    const storageObject = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem(storageName)) : []
    setResult(storageObject)
  }, [])

  if (!result) {
    router.push(`/section/${section.dirname}`)
    return <></>
  }

  const sectionTop = () => {
    router.push(`/section`)
  }

  const questionSize = result.length
  const answer = result.filter((value) => value.answer).length
  const notAnswer = questionSize - answer
  const data = [
    { x: 1, y: answer, label: "正解" },
    { x: 2, y: notAnswer, label: "不正解" },
  ]

  return (
    <Layout title={section ? `${section.name}テスト: 結果` : ''}>
      <h1 className="h1">{section.name}テスト: 結果</h1>
      <h6 className="h6">問題: {question.length}</h6>
      <h6 className="h6">不正解：{notAnswer} / 正解：{answer}</h6>
      <div className="w-100">
        <VictoryPie
          width={300}
          height={200}
          padding={{top: 0, bottom: 0, left: 100, right: 100 }}
          colorScale={["cyan", "tomato"]}
          data={data}
          animate={{ duration: 200 }} />
      </div>
      <div className="text-center">
        {result.length > 0 ? (<>
          {result.map((item) => (
            <div className={'my-3 py-3 result-link ' + (item.answer ? 'result-correct' : 'result-incorrect')} key={item.page}>
              <Link href={`/section/${section.dirname}/${item.page}`}>
                <div>
                  {item.answer ? '正解' : '不正解'}
                  <hr />
                  {item.page}: {question[item.page - 1].question_text}
                </div>
              </Link>
            </div>
          ))}
        </>) : (<></>)}
      </div>
      <div className="text-center my-3">
        <Button variant="info" onClick={sectionTop}>
          セクショントップに戻る
        </Button>
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const paths = contents.section.map((value) => ({
    params: { name: value.dirname },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {  
  const section = contents.section.find((value) => value.dirname === params.name)
  const question = contents.question.filter((value) => value.section_id === section.id)
  return { props: { section, question } }
}

export default PageResult
