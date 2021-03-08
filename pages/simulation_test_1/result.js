import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/simulation_test_1.json'
import { VictoryPie } from "victory"
import { Button } from 'react-bootstrap'

const PageResult = ({ section }) => {
  const router = useRouter()

  const [result, setResult] = useState([])
  useEffect(() => {
    const storageName = `simulation_test_1`
    const storageObject = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem(storageName)) : []
    setResult(storageObject)
  }, [])

  if (!result) {
    router.push(`/simulation_test_1`)
    return <></>
  }

  const simulationTest1Top = () => {
    router.push(`/simulation_test_1`)
  }

  const questionSize = result.length
  const answer = result.filter((value) => value.answer).length
  const notAnswer = questionSize - answer
  const data = [
    { x: 1, y: answer, label: "正解" },
    { x: 2, y: notAnswer, label: "不正解" },
  ]
  const percentage = Math.floor(answer/questionSize*100)

  return (
    <Layout title={section ? `模擬試験① - 結果` : ''}>
      <h1 className="h1">模擬試験① - 結果</h1>
      <h6 className="h6">{questionSize}問 | 2時間 10分 | 正解率72%以上で合格</h6>
      <h6 className="h6">不正解：{notAnswer} / 正解：{answer} (正解率：{percentage}％)</h6>
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
              <Link href={`/simulation_test_1/${item.page}`}>
                <div>
                  {item.answer ? '正解' : '不正解'}
                  <hr />
                  {item.page}: {contents.question[item.page - 1].question_text}
                </div>
              </Link>
            </div>
          ))}
        </>) : (<></>)}
      </div>
      <div className="text-center my-3">
        <Button variant="info" onClick={simulationTest1Top}>
          模擬試験トップに戻る
        </Button>
      </div>
    </Layout>
  )
}

export default PageResult
