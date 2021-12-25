import {Badge, Card} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import '../css/job.css'


const Job = ({job}) => {
  const {title, company, location, pay, postDuration} = job
  const dispatch = useDispatch()
  return (
    <Card className="p-5 m-5 job-card" onClick={()=> dispatch(selectJob(job))}>
      <h2>{title}</h2>
      <h6>{company}</h6>
      <h6>{location}</h6>
      <Badge className="salary-badge" bg="primary">{pay}</Badge>
      <p>{postDuration}</p>
    </Card>
  )
}

export default Job
