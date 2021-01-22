import Head from 'next/head'

import Header from './header'
import Footer from './footer'

export default function Layout({ children, title }) {
  const defaultTitle = 'AWS試験対策'
  const headTitle = title ? `${title} | ${defaultTitle}` : defaultTitle

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="container-fluid">
        {children}
      </div>

      <Footer />
    </>
  )
}
