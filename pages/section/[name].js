import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import contents from '../../contents/section.json'
import { Button } from 'react-bootstrap'

const SectionDetail = ({ section, question }) => {
  // router
  const router = useRouter()

  const [result, setResult] = useState([])
  useEffect(() => {
    const storageName = `section_${section.dirname}`
    const storageObject = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem(storageName)) : []
    setResult(storageObject)
  }, [])

  const testStart = () => {
    const storageName = `section_${section.dirname}`
    localStorage.removeItem(storageName)
    const storageObject = question.map(valule => ({
      page: valule.page,
      answer: false,
    }))
    localStorage.setItem(storageName, JSON.stringify(storageObject))
    router.push(`/section/${section.dirname}/1`)
  }

  const testResult = () => {
    router.push(`/section/${section.dirname}/result`)
  }

  return (
    <Layout title={section ? `${section.name}` : ''}>
      <h1 className="h1">{section.name}テスト</h1>
      <h6 className="h6">問題の数: {question.length}</h6>
      <p className="text-center">{section.name}に関する理解をアソシエイト試験形式のテストで確認します。<br />ただし、理解促進と慣れを目的としており、本番試験よりも基本的な内容の問題となります。</p>
      <div className="text-center">
        <Button variant="primary" onClick={testStart}>
          小テストを開始する
        </Button>
      </div>
      <div className="text-center my-3">
        {!!result ? (<>
          <Button variant="secondary" onClick={testResult}>
            結果を確認する
          </Button>
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

export default SectionDetail
