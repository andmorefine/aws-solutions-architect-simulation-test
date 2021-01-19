
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout'
import contents from '../../contents/practice_index.json'

const PracticeDetail = ({ practice }) => {
  const router = useRouter()

  return (
    <Layout title={practice ? `${practice.name}` : ''}>
      <h1 className="h1">{practice.name}</h1>

    </Layout>
  )
}

export const getStaticPaths = async () => {
  const paths = contents.practice.map((value) => ({
    params: { name: value.dirname },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {  
  console.log(params.name)
  const practice = contents.practice.find((value) => value.dirname == params.name)
  return { props: { practice } }
}

export default PracticeDetail
