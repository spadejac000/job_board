import {useState} from 'react'
import JobsData from '../data/JobsData';
import Filters from './Filters';
import { Container, Row, Col } from 'react-bootstrap';
import Jobs from './Jobs'
import {toast} from 'react-toastify'
import SelectedJob from './SelectedJob'
import Paginate from './Paginate'
import '../css/dashboard.css'

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
            <div>
              <p>Sort by: relavence - date</p>
              <p>Page 1 of 67 jobs</p>
            </div>
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
