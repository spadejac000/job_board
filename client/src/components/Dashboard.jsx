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
import {useParams} from 'react-router-dom'

const Dashboard = () => {

  const dispatch = useDispatch();
  const params = useParams()
  const {keyword} = useParams();
  const pageNumber = params.pageNumber || 1;

  useEffect(() => {
    dispatch(getJobs(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  const jobsState = useSelector(state => 
    state.getJobs
  )

  const {loading, error, jobs, page, pages, count} = jobsState;

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
                  <p>Page {page} of {jobs.jobs === null ? 0 : count} jobs</p>
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
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
      </Container>
      <MessagesBox/>
    </>
  )
}

export default Dashboard
