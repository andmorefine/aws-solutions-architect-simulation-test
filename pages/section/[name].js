import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/section.json'
import { Button } from 'react-bootstrap';

const SectionDetail = ({ section, question }) => {

  return (
    <Layout title={section ? `${section.name}` : ''}>
      <h1 className="h1">{section.name}テスト</h1>
      <h6 className="h6">問題の数: {question.length}</h6>
      <p className="text-center">{section.name}に関する理解をアソシエイト試験形式のテストで確認します。<br />ただし、理解促進と慣れを目的としており、本番試験よりも基本的な内容の問題となります。</p>
      <div className="text-center">
        <Link href={`/section/${section.dirname}/1`}>
          <Button variant="primary">
            小テストを開始する
          </Button>
        </Link>
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
