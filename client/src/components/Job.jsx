import {Badge, Card} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {selectJob} from '../actions/jobActions'


const Job = ({job}) => {
  const {title, company, location, pay, postDuration} = job
  const selectedJob = useSelector(state => state.selectedJob)
  const dispatch = useDispatch()
  return (
    <Card className="p-5 m-5" onClick={()=> dispatch(selectJob(job))}>
      <h2>{title}</h2>
      <h6>{company}</h6>
      <h6>{location}</h6>
      <Badge bg="primary">{pay}</Badge>
      <p>{postDuration}</p>
    </Card>
  )
}

export default Job
