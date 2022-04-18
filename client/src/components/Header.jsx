import {useEffect} from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import '../css/header.css'
import {useDispatch, useSelector} from 'react-redux'
import {printUser} from '../actions/userActions'
import {FaUser, FaComment, FaCog, FaChevronRight, FaBriefcase, FaThumbtack, FaList, FaHeart, FaDoorOpen} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {useLocation} from 'react-router-dom'

const Header = ({isAuthenticated, setAuth}) => {

  const dispatch = useDispatch();
  const location = useLocation()

  useEffect(() => {
    dispatch(printUser())
  }, [dispatch, isAuthenticated])

  let user = useSelector((state) => {
    if(state.user.userFirstName) {
      return state.user.userFirstName
    } else {
      return null
    }
  })

  let userRole = useSelector((state) =>
    state.user.userRole
  )

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setAuth(false)
  }

  return (

    isAuthenticated && userRole === "employeer" ? 

    <Navbar 
        expand="lg" 
        className={`logged-in-navbar ${location.pathname !== '/messages' ? 'mb-5' : ''}`}
      >
        <Container>
          <Navbar.Brand className="logged-in-nav-brand-logo" as={Link} to="/">Job Board</Navbar.Brand>
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

    isAuthenticated ? 

      <Navbar 
        expand="lg" 
        className={`logged-in-navbar ${location.pathname !== '/messages' ? 'mb-5' : ''}`}
      >
        <Container>
          <Navbar.Brand className="logged-in-nav-brand-logo" as={Link} to="/">Job Board</Navbar.Brand>
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
              {/* <Nav.Link className="navbar-messages-link" as={Link} to="/messages"><div className="navbar-message-icon-container navigation-bar-icon-container"><FaComment className="navbar-message-icon"/></div></Nav.Link> */}

              <NavDropdown className="navigation-bar-icon-container" id="basic-nav-dropdown" align="end">

                {/* <NavDropdown.Item>
                  <LinkContainer className="nav-dropdown-item-link-container" to="/favorite-jobs">
                    <div>
                      <div className="dropdown-item-left-grouping">
                        <div className="dropdown-navigation-bar-icon-container">
                          <FaHeart />
                        </div>
                        Favorite Jobs
                      </div>
                      <FaChevronRight />
                    </div>
                  </LinkContainer>
                </NavDropdown.Item> */}

                <NavDropdown.Item>
                  <LinkContainer className="nav-dropdown-item-link-container" to="/profile">
                    <div>
                      <div className="dropdown-item-left-grouping">
                        <div className="dropdown-navigation-bar-icon-container">
                          <FaUser/>
                        </div>
                        Profile
                      </div>
                      <FaChevronRight/>
                    </div>
                  </LinkContainer>
                </NavDropdown.Item>
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
                          <FaDoorOpen/>
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

      <Navbar expand="lg" className={location.pathname === '/' ?'mb-5 logged-out-dash-nav' : ''}>
        <Container>
          <Navbar.Brand className={location.pathname === '/' ? 'dashboard-nav-brand-logo' : 'navbar-brand-logo'} as={Link} to="/">Job Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link id="nav-bar-links" as={Link} to="/login">Login</Nav.Link>
              <Nav.Link id="nav-bar-links" as={Link} to="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  )
}

export default Header
