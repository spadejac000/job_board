import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap';
import '../css/header.css'

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href="/">Job Board</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex input-group navbar-search-form">
            <FormControl
              type="search"
              placeholder="Search"
              className="navbar-search-input"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
