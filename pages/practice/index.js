import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/practice_index.json'

import { Container, Row, Col, Card } from 'react-bootstrap';

const PracticeIndex = ({ posts }) => {
  return (
    <Layout title="セクション一覧">
      <h1 className="h1">セクション一覧</h1>
      <Container>
        <Row>
          {posts.map((practice) => (
            <Col sm={4} md={3} key={practice.id}>
              <Card>
                <Link href={`/practice/${practice.dirname}`} key={practice.id}>
                  <a className="list-group-item list-group-item-action">{practice.name}</a>
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
  const posts = contents.practice
  return { props: { posts } }
}

export default PracticeIndex
