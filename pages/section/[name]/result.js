import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import contents from '../../../contents/section.json'
import { VictoryPie } from "victory"

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
      <h6 className="h6">問題の数: {question.length}</h6>
      <div className="w-100">
        <VictoryPie
          width={300}
          height={200}
          padding={{top: 0, bottom: 0, left: 70, right: 70 }}
          colorScale={["cyan", "tomato"]}
          data={data}
          animate={{ duration: 200 }} />
      </div>
      <div className="text-center">
        {result.length > 0 ? (<>
          {result.map((item) => (
            <div className="py-1" key={item.page}>
              {item.page}: {item.answer ? '正解' : '不正解'}
            </div>
          ))}
        </>) : (<></>)}
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
