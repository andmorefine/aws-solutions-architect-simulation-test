import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/question">
            <a>模擬試験</a>
          </Link>
        </h1>
      </main>
    </Layout>
  )
}
