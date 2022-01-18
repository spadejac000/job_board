import {useEffect} from 'react'
import Filters from './Filters';
import { Container, Row, Col } from 'react-bootstrap';
import Jobs from './Jobs'
import SelectedJob from './SelectedJob'
import Paginate from './Paginate'
import '../css/dashboard.css'
import MessagesBox from './MessagesBox';
import Loader from './Loader';
import AlertMessage from './AlertMessage';
import {useDispatch, useSelector} from 'react-redux'
import {getJobs} from '../actions/jobActions'

const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch])

  const jobsState = useSelector(state => 
    state.getJobs
  )

  const {loading, error, jobs} = jobsState;

  return (
    <>
      <Filters/>
      <hr/>
      <Container>
        <Row>
          <Col>
            {loading ? (
              <Loader/>
            ) : error ? <AlertMessage variant="danger">{error}</AlertMessage> : (
              <div>
                <div className='sort-jobs-container'>
                  <p>Sort by: relavence - date</p>
                  <p>Page 1 of {jobs === null ? 0 : jobs.length} jobs</p>
                </div>
                <Jobs jobs={jobs}/>
              </div>
              
            )
              
            }
            
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
