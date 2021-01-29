import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/section.json'

import { Container, Row, Col, Card } from 'react-bootstrap'
import { VictoryChart, VictoryArea, VictoryPolarAxis, VictoryTheme, VictoryLabel } from "victory"

const SectionIndex = ({ posts }) => {
  const [result, setResult] = useState([])
  useEffect(() => {
    const resultNum = posts.filter((value) => value.quiz).map((section) => (
      {
        section_name: section.name,
        section_dirname: section.dirname,
        result_num: (typeof localStorage !== 'undefined' && localStorage.getItem(`section_${section.dirname}`)) ? JSON.parse(localStorage.getItem(`section_${section.dirname}`)).filter((value) => value.answer).length : 0,
        question_num: contents.question.filter((value) => value.section_id === section.id).length,
      }
    ))
    setResult(resultNum)
  }, [])

  if (!result) return <></>

  const data = result.filter((v) => v.question_num > 0).map((value) => ({
    x: value.section_name,
    y: (value.result_num / value.question_num) * 100,
  }))

  return (
    <Layout title="練習問題: セクション一覧">
      <h1 className="h1">練習問題: セクション一覧</h1>
      <Container>
        <Row>
          {posts.filter((value) => value.quiz).map((section) => (
            <Col sm={4} md={3} key={section.id}>
              <Card>
                <Link href={`/section/${section.dirname}`} key={section.id}>
                  <a className="list-group-item list-group-item-action">
                    <span>{section.name}</span>
                    <hr />
                    {result.map((value, index) => {
                      return (value.section_dirname === section.dirname) ?
                        <div key={index}>
                          <div>解答: {value.result_num} / 問題: {value.question_num}</div>
                        </div>
                      : <span key={index}></span>
                    })}
                  </a>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <VictoryChart
            polar
            theme={VictoryTheme.material}
            animate={{ duration: 1000, onLoad: { duration: 500 } }}
            width={300}
            height={200}
            padding={{top: 0, bottom: 0, left: 80, right: 80 }}>
            <VictoryArea
              data={data}
              domain={{y: [0, 100]}}
              style={{ data: { fill: "tomato", width: 30 } }}
              labelPlacement="vertical" />
            <VictoryPolarAxis labelPlacement="vertical" />
          </VictoryChart>
        </Row>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = contents.section
  return { props: { posts } }
}

export default SectionIndex
