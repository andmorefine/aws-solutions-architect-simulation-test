import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/simulation_test_1.json'

const QuestionIndex = ({ posts }) => {
  return (
    <Layout title="問題一覧">
      <h1 className="h1">問題一覧</h1>
      <div className="list-group">
        {posts.map((question) => (
          <Link href={`/simulation_test_1/${question.id}`} key={question.id}>
            <a className="list-group-item list-group-item-action">{question.question_text}</a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = contents.question
  return { props: { posts } }
}

export default QuestionIndex
