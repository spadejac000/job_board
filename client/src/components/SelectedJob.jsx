import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import {Card, Button, Row, Col} from 'react-bootstrap'
import '../css/selected-job.css'
import {FaTimes} from 'react-icons/fa'

const SelectedJob = () => {
  const dispatch = useDispatch()

  const selectedJob = useSelector((state) => state.selectedJob)

  useEffect(() => {
    dispatch(selectJob())
  }, [dispatch])

  return (
    <>
      {selectedJob === null ? (null): (
        <Card className="m-3 selected-job-card">
          <Card.Header>
            <Row>
              <Col>
                <h2>{selectedJob.title}</h2>
                <h6>{selectedJob.company}</h6>
                <h6>{selectedJob.pay}</h6>
                <Button>Apply</Button>
              </Col>
              <Col className="exit-selected-job-col">
                <div onClick={() => dispatch(selectJob(null))}>
                  <FaTimes/>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-5">
            <p>{selectedJob.description}</p>
          </Card.Body>
        </Card>
        
      )}
    </>
  )
}

export default SelectedJob
