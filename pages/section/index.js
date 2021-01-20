import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/section.json'

import { Container, Row, Col, Card } from 'react-bootstrap';

const SectionIndex = ({ posts }) => {
  return (
    <Layout title="セクション一覧">
      <h1 className="h1">セクション一覧</h1>
      <Container>
        <Row>
          {posts.map((section) => (
            <Col sm={4} md={3} key={section.id}>
              <Card>
                <Link href={`/section/${section.dirname}`} key={section.id}>
                  <a className="list-group-item list-group-item-action">{section.name}</a>
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
