import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import contents from '../../contents/simulation_test_1.json'
import { Button } from 'react-bootstrap'

const QuestionIndex = ({ posts }) => {
  // router
  const router = useRouter()
  const simulationStart = () => {
    const storageName = `simulation_test_1`
    localStorage.removeItem(storageName)
    const storageObject = posts.map(question => ({
      page: question.id,
      answer: false,
    }))
    localStorage.setItem(storageName, JSON.stringify(storageObject))
    router.push(`/simulation_test_1/1`)
  }

  return (
    <Layout title="模擬試験①">
      <h1 className="h1">模擬試験①</h1>
      <h6 className="h6">65問 | 2時間 10分 | 正解率72%以上で合格</h6>
      <p>模擬試験の1回目です。各セクションのテストより難易度はかなり高めになっています。</p>
      <h5 className="h5">説明:</h5>
      <ul>
        {/* <li>テストをいつでも中断して、あとで再開できます。</li> */}
        <li>何度でも好きなだけテストを受けなおすことができます。</li>
        {/* <li>画面上部のプログレスバーには進捗状況とテストの残り時間が表示されます。時間切れになっても心配しないでください。時間切れになった後も、テストは終了できます。</li> */}
        {/* <li>問題をスキップし、テストの最後に戻って解答できます。</li> */}
        {/* <li>また、自信のない問題は「見直しのマークを付ける」を使って、テストを送信する前に、もう一度戻って見直すこともできます。</li> */}
        {/* <li>すぐにテストを終了して結果を見たい場合は停止ボタンを押してください。</li> */}
      </ul>
      <div className="text-center">
        <Button variant="primary" onClick={simulationStart}>
          模擬試験を開始する
        </Button>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = contents.question
  return { props: { posts } }
}

export default QuestionIndex
