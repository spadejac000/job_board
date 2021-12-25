import {useEffect} from 'react'
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import '../css/header.css'
import {useDispatch, useSelector} from 'react-redux'
import {printUser} from '../actions/userActions'
import {toast } from 'react-toastify';
import {FaUser} from 'react-icons/fa'

const Header = ({isAuthenticated, setAuth}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(printUser())
  }, [dispatch, isAuthenticated])

  const user = useSelector(state => 
    state.user.user.user_first_name
  )

  console.log('user: ', user)

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setAuth(false)
    toast.success("Logged out successfully!")
  }

  return (

    isAuthenticated ? 

      <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
        <Container>
          <Navbar.Brand href="/">Job Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Button variant="primary" onClick={e => logout(e)}><FaUser/> Logout</Button>
            </Nav>
            <div className="navbar-user-name ms-3">
              <span style={{color: 'white'}} className="welcome-title">Welcome, {user}</span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    :

      <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
        <Container>
          <Navbar.Brand href="/">Job Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  )
}

export default Header
