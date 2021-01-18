import Link from 'next/link'

const Header = () => (
  <>
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">AWS試験対策</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link href="/"><a className="nav-link">練習問題</a></Link></li>
              <li className="nav-item"><Link href="/simulation_test_1"><a className="nav-link">模擬試験1</a></Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </>
)

export default Header
