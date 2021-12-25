import {useState, useEffect} from 'react'
import JobsData from '../data/JobsData';
import Filters from './Filters';
import { Container, Row, Col } from 'react-bootstrap';
import Jobs from './Jobs'
import {FaUser} from 'react-icons/fa'
import {Button} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import SelectedJob from './SelectedJob'

const Dashboard = ({setAuth}) => {
  // const dispatch = useDispatch()

  const [jobs, setJobs] = useState(JobsData)
  const [name, setName] = useState('')

  async function getName() {
    try {
      const response = await fetch('/api/users', {
        method: "GET",
        headers: {token: localStorage.token}
      })
      const parseResponse = await response.json();
      setName(parseResponse.user_first_name)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getName()
    // dispatch(selectJob())
  }, [])

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setAuth(false)
    toast.success("Logged out successfully!")
  }

  return (
    <>
      {name}
      <Button onClick={e => logout(e)}><FaUser/> Logout</Button>
      <Filters/>
      <hr/>
      <Container>
        <Row>
          <Col>
            <Jobs jobs={jobs}/>
          </Col>
          <Col>
            <SelectedJob/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
