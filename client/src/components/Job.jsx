import {useState} from 'react'
import {Badge, Card, Row, Col, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import '../css/job.css'
import {FaHeart, FaBan} from 'react-icons/fa'
import {addJobToFavorites} from '../actions/jobActions'


const Job = ({job}) => {

  const [viewBanCard, setViewBanCard] = useState(false)
  const {benefits, city, work_address, job_location, job_title, job_type, salary, zip, _description, _state, date_posted, job_id} = job
  const dispatch = useDispatch()

  let today = new Date();
  let datePosted = new Date(date_posted.replace(' ', 'T'));
  let timeDiff = today.getTime() - datePosted.getTime()
  let timeDivider = 1000 * 60 * 60 * 24;
  let datePostedInDays = Math.floor(timeDiff / timeDivider)

  let userID = useSelector((state) =>
    state.user.userID
  )

  const handleAddJobToFavorites = (e, jobID) => {
    e.preventDefault()
    e.stopPropagation();
    dispatch(addJobToFavorites(jobID, userID))
  }

  const handleBanJob = (e) => {
    e.stopPropagation();
    setViewBanCard(true)
  }

  return (
    viewBanCard ?
    <Card className="p-4 job-card">
      <div className="ban-card-content">
        <h5>Job Removed</h5>
        <Button onClick={() => setViewBanCard(false)}>Undo</Button>
      </div>
    </Card>
    :
    <Card className="p-4 job-card" onClick={()=> dispatch(selectJob(job))}>
      <Row>
        <Col md={10}>
          <h2>{job_title}</h2>
          <h6>Company Name</h6>
          <h6>{work_address} {city}, {_state}, {zip}</h6>
          <Badge className="salary-badge" bg="primary">{salary}</Badge>
          <p>Posted {datePostedInDays === 0 ? 'today' : datePostedInDays === 1 ? 'yesterday' : `${datePostedInDays} days ago`}</p>
        </Col>
        <Col md={2} className="save-ban-col">
          <div onClick={(e) => handleAddJobToFavorites(e, job_id)}>
            <FaHeart/>
          </div>
          <div onClick={(e) => handleBanJob(e)}>
            <FaBan/>
          </div>
        </Col>
      </Row>
      
    </Card>
  )
}

export default Job
