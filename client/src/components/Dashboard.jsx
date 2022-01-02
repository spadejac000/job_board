import {useState, useEffect} from 'react'
import Filters from './Filters';
import { Container, Row, Col } from 'react-bootstrap';
import Jobs from './Jobs'
import {toast} from 'react-toastify'
import SelectedJob from './SelectedJob'
import Paginate from './Paginate'
import '../css/dashboard.css'
import MessagesBox from './MessagesBox';
import {useDispatch, useSelector} from 'react-redux'
import {getJobs} from '../actions/jobActions'

const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch])

  const jobs = useSelector(state => 
    state.getJobs
  )

  return (
    <>
      <Filters/>
      <hr/>
      <Container>
        <Row>
          <Col>
            <div className='sort-jobs-container m-3'>
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
      <MessagesBox/>
    </>
  )
}

export default Dashboard
