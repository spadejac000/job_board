import {useEffect, useState} from 'react'
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

const Dashboard = ({isAuthenticated}) => {

  const dispatch = useDispatch();
  const params = useParams()
  const {whatKeyword} = useParams();
  const {whereKeyword} = useParams();
  const pageNumber = params.pageNumber || 1;
  const [sort, setSort] = useState('')

  useEffect(() => {
    dispatch(getJobs(whatKeyword, whereKeyword, sort, pageNumber))
  }, [dispatch, whatKeyword, whereKeyword, sort, pageNumber])

  const jobsState = useSelector(state => 
    state.getJobs
  )

  const {loading, error, jobs, page, pages, count} = jobsState;

  const sortByDatePosted = (e) => {
    e.preventDefault()
    if(sort === '') {
      setSort('descending')
    }
    sort === 'descending' ? setSort('ascending') : setSort('descending')
    dispatch(getJobs(whatKeyword, whereKeyword, sort, pageNumber))
  }

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
                  <p>Sort by: <a href="">relavence</a> - <a href="" onClick={(e) => sortByDatePosted(e)}>date</a></p>
                  <p>Page {page} of {jobs.jobs === null ? 0 : count} jobs</p>
                </div>
                <Jobs jobs={jobs} isAuthenticated={isAuthenticated}/>
              </div>
              )
            }
          </Col>
          <Col>
            <SelectedJob/>
          </Col>
        </Row>
        <Paginate pages={pages} page={page} whatKeyword={whatKeyword ? whatKeyword : ''} whereKeyword={whereKeyword ? whereKeyword : ''}/>
      </Container>
      <MessagesBox isAuthenticated={isAuthenticated}/>
    </>
  )
}

export default Dashboard
