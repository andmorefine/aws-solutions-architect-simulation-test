import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/question_index.json'

const QuestionIndex = ({ posts }) => {
  return (
    <Layout title="問題一覧">
      <h1 className="h1">問題一覧</h1>
      <div className="list-group">
        {posts.map((question) => (
          <Link href={`/question/${question.id}`} key={question.id}>
            <a className="list-group-item list-group-item-action">{question.question_text}</a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = contents
  return { props: { posts } }
}

export default QuestionIndex
