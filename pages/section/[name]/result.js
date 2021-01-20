import Link from 'next/link'
import { useState } from 'react'
import Layout from '../../../components/layout'
import contents from '../../../contents/section.json'
import { Button } from 'react-bootstrap'
import { reactLocalStorage } from 'reactjs-localstorage'

const PageResult = ({ section, question }) => {
  const [result, setResult] = useState([])

  const handleResult = () => {
    const storageName = `test_${section.dirname}`
    const storageObject = reactLocalStorage.getObject(storageName)
    // console.log(storageObject)
    // setResult(storageObject)
  }

  return (
    <Layout title={section ? `${section.name}テスト: 結果` : ''}>
      <h1 className="h1">{section.name}テスト: 結果</h1>
      <h6 className="h6">問題の数: {question.length}</h6>
      <div className="text-center">
        <Button variant="secondary" onClick={handleResult}>
          結果を確認
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
