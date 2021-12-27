import {Badge, Card, Row, Col} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import '../css/job.css'
import {FaHeart, FaBan} from 'react-icons/fa'


const Job = ({job}) => {
  const {title, company, location, pay, postDuration} = job
  const dispatch = useDispatch()
  return (
    <Card className="p-5 m-5 job-card" onClick={()=> dispatch(selectJob(job))}>
      <Row>
        <Col md={10}>
          <h2>{title}</h2>
          <h6>{company}</h6>
          <h6>{location}</h6>
          <Badge className="salary-badge" bg="primary">{pay}</Badge>
          <p>{postDuration}</p>
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
