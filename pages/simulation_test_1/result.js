import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import contents from '../../contents/section.json'

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

  return (
    <Layout title={section ? `模擬試験① - 結果` : ''}>
      <h1 className="h1">模擬試験① - 結果</h1>
      <h6 className="h6">{result.length}問 | 2時間 10分 | 正解率72%以上で合格</h6>
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

export default PageResult
