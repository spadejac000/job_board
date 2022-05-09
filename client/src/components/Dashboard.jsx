import {useEffect, useState, lazy, Suspense} from 'react'
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import '../css/dashboard.css'
import {useDispatch, useSelector} from 'react-redux'
import {getJobs} from '../actions/jobActions'
import {getTheme} from '../actions/themeActions'
import {useParams} from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'
import Loader from './Loader';
import AlertMessage from './AlertMessage';
const Filters = lazy(() => import('./Filters'))
const SelectedJob = lazy(() => import('./SelectedJob'))
const Paginate = lazy(() => import('./Paginate'))
const MessagesBox = lazy(() => import('./MessagesBox'))
const Jobs = lazy(() => import('./Jobs'))

const Dashboard = ({isAuthenticated}) => {

  const dispatch = useDispatch();
  const params = useParams()
  const {whatKeyword} = useParams();
  const {whereKeyword} = useParams();
  const pageNumber = params.pageNumber || 1;
  const [sort, setSort] = useState(1)
  const [dateFilter, setDateFilter] = useState(0)
  const [dateFilterBtnText, setDateFilterBtnText] = useState('')
  const [jobLocationFilterBtnText, setJobLocationFilterBtnText] = useState('')
  const [jobLocationFilter, setJobLocationFilter] = useState('')

  let userID = useSelector((state) =>
    state.user.userID
  )

  useEffect(() => {
    dispatch(getTheme(userID))
    dispatch(getJobs(whatKeyword, whereKeyword, sort, dateFilter, jobLocationFilter, pageNumber))
  }, [dispatch, whatKeyword, whereKeyword, sort, dateFilter, jobLocationFilter, pageNumber])

  const jobsState = useSelector(state => 
    state.getJobs
  )

  const {loading, error, jobs, page, pages, count} = jobsState;

  const sortByDatePosted = (e) => {
    e.preventDefault()
    sort === 2 ? setSort(1) : setSort(2)
  }

  const submitDateFilter = (filterValue) => {
    setDateFilter(filterValue)
    setDateFilterBtnText(filterValue === 1 ? 'Last 24 hours' : filterValue === 3 ? 'Last 3 days' : filterValue === 7 ? 'Last 7 days' : filterValue === 14 ? 'Last 14 days' : '')
  }

  const delDateFilterBtn = () => {
    setDateFilterBtnText('')
    setDateFilter(0)
  }

  const submitJobLocationFilter = (filterValue) => {
    setJobLocationFilter(filterValue)
    setJobLocationFilterBtnText(filterValue === 'Remote' ? 'Remote' : filterValue === 'In office' ? 'In office' : filterValue === 'Hybrid' ? 'Hybrid' : '')
  }

  const delJobLocationFilterBtn = () => {
    setJobLocationFilterBtnText('')
    setJobLocationFilter('')
  }

  return (
    <Suspense fallback={<Loader/>}>
      <Filters/>

      <Container className="filter-row">

        {dateFilterBtnText === '' ? 
          <Dropdown>
            <Dropdown.Toggle 
              variant="primary" 
              id="dropdown-basic"
            >
              Date Posted
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => submitDateFilter(1)}>
                Last 24 hours
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => submitDateFilter(3)}>
                Last 3 days
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => submitDateFilter(7)}>Last 7 days</Dropdown.Item>
              <Dropdown.Item onClick={(e) => submitDateFilter(14)}>Last 14 days</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          :
          <Button variant="secondary" onClick={() => delDateFilterBtn()}>{dateFilterBtnText} <FaTimes/></Button>
        }
        
        {jobLocationFilterBtnText === '' ?
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Job Location
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => submitJobLocationFilter('Remote')}>Remote</Dropdown.Item>
              <Dropdown.Item onClick={(e) => submitJobLocationFilter('In office')}>In office</Dropdown.Item>
              <Dropdown.Item onClick={(e) => submitJobLocationFilter('Hybrid')}>Hybrid</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          :
          <Button variant="secondary" onClick={() => delJobLocationFilterBtn()}>
            {jobLocationFilterBtnText} <FaTimes/>
          </Button>
        }
        

        
        
        {/* <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Within 25 miles
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Salary Estimate
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Job Type
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Developer Skills
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Education Level
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Location
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Company
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Experience Level
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

      </Container>

      <hr/>
      <Container>
        <Row>
          <Col>
            {loading ? (
              <Loader/>
            ) : error ? <AlertMessage variant="danger">{error}</AlertMessage> : (
              <div>
                <div className='sort-jobs-container'>
                  <p>Sort by: <a href="">relevance</a> - <a href="" onClick={(e) => sortByDatePosted(e)}>date</a></p>
                  <p>Page {page} of {jobs.jobs === null ? 0 : count} jobs</p>
                </div>
                <Jobs jobs={jobs} isAuthenticated={isAuthenticated}/>
              </div>
              )
            }
          </Col>
        </Row> 
        <Paginate pages={pages} page={page} whatKeyword={whatKeyword ? whatKeyword : ''} whereKeyword={whereKeyword ? whereKeyword : ''}/>
      </Container>
      {/* <MessagesBox isAuthenticated={isAuthenticated}/> */}
    </Suspense>
  )
}

export default Dashboard