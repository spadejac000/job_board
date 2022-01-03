import {Badge, Card, Row, Col} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import '../css/job.css'
import {FaHeart, FaBan} from 'react-icons/fa'


const Job = ({job}) => {
  console.log('here is the job')
  const {title, company, city, pay, postDuration} = job
  const dispatch = useDispatch()
  return (
    <Card className="p-4 m-3 job-card" onClick={()=> dispatch(selectJob(job))}>
      <Row>
        <Col md={10}>
          <h2>{title}</h2>
          <h6>{company}</h6>
          <h6>{city}</h6>
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
