import {useEffect} from 'react'
import {Navbar, Container, Nav, Button, NavDropdown} from 'react-bootstrap';
import '../css/header.css'
import {useDispatch, useSelector} from 'react-redux'
import {printUser} from '../actions/userActions'
import {toast } from 'react-toastify';
import {FaUser, FaComment, FaCog, FaChevronRight, FaBriefcase, FaThumbtack, FaList} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'

const Header = ({isAuthenticated, setAuth}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(printUser())
  }, [dispatch, isAuthenticated])

  let user = useSelector((state) => {
    if(state.user.userName) {
      return state.user.userName.user_first_name
    } else {
      return null
    }
  })

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
          <Navbar.Brand as={Link} to="/">Job Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 nav-system"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <div className="navbar-user-name ms-3">
                <span style={{color: 'white'}} className="welcome-title">{user}</span>
              </div>
              <Nav.Link className="navbar-messages-link" as={Link} to="/messages"><div className="navbar-message-icon-container navigation-bar-icon-container"><FaComment className="navbar-message-icon"/></div></Nav.Link>

                <NavDropdown className="navigation-bar-icon-container navbar-jobs-link" title={<FaBriefcase/>} id="jobs-nav-dropdown" align="end">
                  <NavDropdown.Item>
                    <LinkContainer className="nav-dropdown-item-link-container" to="/post-job">
                      <div>
                        <div className="dropdown-item-left-grouping">
                          <div className="dropdown-navigation-bar-icon-container">
                            <FaThumbtack />
                          </div>
                          Post Job
                        </div>
                        <FaChevronRight />
                      </div>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <LinkContainer className="nav-dropdown-item-link-container" to="/jobs-created">
                      <div>
                        <div className="dropdown-item-left-grouping">
                          <div className="dropdown-navigation-bar-icon-container">
                            <FaList />
                          </div>
                          View Jobs
                        </div>
                        <FaChevronRight/>
                      </div>
                    </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown className="navigation-bar-icon-container" id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item>
                    <LinkContainer className="nav-dropdown-item-link-container" to="/settings">
                      <div>
                        <div className="dropdown-item-left-grouping">
                          <div className="dropdown-navigation-bar-icon-container">
                            <FaCog />
                          </div>
                          Settings
                        </div>
                        <FaChevronRight />
                      </div>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={e => logout(e)}>
                    <LinkContainer className="nav-dropdown-item-link-container" to="/">
                      <div>
                        <div className="dropdown-item-left-grouping">
                          <div className="dropdown-navigation-bar-icon-container">
                            <FaUser />
                          </div>
                          Sign Out
                        </div>
                        <FaChevronRight/>
                      </div>
                    </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>

            </Nav>
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
