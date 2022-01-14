import {Badge, Card, Row, Col} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import '../css/job.css'
import {FaHeart, FaBan} from 'react-icons/fa'


const Job = ({job}) => {
  const {benefits, city, work_address, job_location, job_title, job_type, salary, zip, _description, _state, date_posted} = job
  const dispatch = useDispatch()

  let today = new Date();

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
          <div>
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
