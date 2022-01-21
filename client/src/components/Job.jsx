import {Badge, Card, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import '../css/job.css'
import {FaHeart, FaBan} from 'react-icons/fa'
import {addJobToFavorites} from '../actions/jobActions'


const Job = ({job}) => {
  const {benefits, city, work_address, job_location, job_title, job_type, salary, zip, _description, _state, date_posted, job_id} = job
  const dispatch = useDispatch()

  let today = new Date();

  let userID = useSelector((state) =>
    state.user.userID
  )

  const handleAddJobToFavorites = (e, jobID) => {
    e.preventDefault()
    dispatch(addJobToFavorites(jobID, userID))
  }

  return (
    <Card className="p-4 job-card" onClick={()=> dispatch(selectJob(job))}>
      <Row>
        <Col md={10}>
          <h2>{job_title}</h2>
          <h6>Company Name</h6>
          <h6>{work_address} {city}, {_state}, {zip}</h6>
          <Badge className="salary-badge" bg="primary">{salary}</Badge>
          <p>Posted {date_posted} days ago</p>
        </Col>
        <Col md={2} className="save-ban-col">
          <div onClick={(e) => handleAddJobToFavorites(e, job_id)}>
            <FaHeart/>
          </div>
          <div>
            <FaBan/>
          </div>
        </Col>
      </Row>
      
    </Card>
  )
}

export default Job
