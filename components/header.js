import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => (
  <>
    <header>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">AWS試験対策</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/section">練習問題</Nav.Link>
              <Nav.Link href="/simulation_test_1">模擬試験①</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  </>
)

export default Header
