import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Home() {
  return (
    <Layout>

      <Container>
        <h1 className="h1">AWS 認定ソリューションアーキテクト</h1>
        <h6 className="h6">アソシエイト試験突破講座（SAA-C02試験対応版）</h6>
        <Row>
          <Col sm={4} md={3}>
            <Card>
              <Link href="/section">
                <a className="list-group-item list-group-item-action">練習問題：セクション一覧</a>
              </Link>
            </Card>
          </Col>
          <Col sm={4} md={3}>
            <Card>
              <Link href="/simulation_test_1">
                <a className="list-group-item list-group-item-action">模擬試験①</a>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
