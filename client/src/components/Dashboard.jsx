import {useEffect, useState} from 'react'
import Filters from './Filters';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
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
import {FaTimes} from 'react-icons/fa'

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

  useEffect(() => {
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
    <>
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
