import {useState} from 'react'
import JobsData from '../data/JobsData';
import Filters from './Filters';
import { Container, Row, Col } from 'react-bootstrap';
import Jobs from './Jobs'
import {toast} from 'react-toastify'
import SelectedJob from './SelectedJob'
import Paginate from './Paginate'

const Dashboard = ({setAuth}) => {

  const [jobs, setJobs] = useState(JobsData)

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setAuth(false)
    toast.success("Logged out successfully!")
  }

  return (
    <>
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
        <Paginate/>
      </Container>
    </>
  )
}

export default Dashboard
