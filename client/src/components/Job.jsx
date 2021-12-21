import {Badge, Card} from 'react-bootstrap'
function Job({job}) {
  const {title, company, location, pay, postDuration} = job
  return (
    <Card className="p-5 m-5">
      <h2>{title}</h2>
      <h6>{company}</h6>
      <h6>{location}</h6>
      <Badge bg="primary">{pay}</Badge>
      <p>{postDuration}</p>
    </Card>
  )
}

export default Job
