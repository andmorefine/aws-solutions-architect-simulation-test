import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/section.json'

import { Container, Row, Col, Card } from 'react-bootstrap';

const SectionIndex = ({ posts }) => {
  const [result, setResult] = useState([])
  useEffect(() => {
    const resultNum = posts.map((section) => (
      {
        section_dirname: section.dirname,
        result_num: (typeof localStorage !== 'undefined' && localStorage.getItem(`section_${section.dirname}`)) ? JSON.parse(localStorage.getItem(`section_${section.dirname}`)).filter((value) => value.answer).length : 0,
        question_num: contents.question.filter((value) => value.section_id === section.id).length,
      }
    ))
    setResult(resultNum)
  }, [])

  if (!result) return <></>

  console.log(result)

  return (
    <Layout title="練習問題: セクション一覧">
      <h1 className="h1">練習問題: セクション一覧</h1>
      <Container>
        <Row>
          {posts.map((section) => (
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
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = contents.section
  return { props: { posts } }
}

export default SectionIndex
