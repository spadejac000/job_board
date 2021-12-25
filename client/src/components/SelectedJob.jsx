import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import {Card} from 'react-bootstrap'
import '../css/selected-job.css'

const SelectedJob = () => {
  const dispatch = useDispatch()

  const selectedJob = useSelector((state) => state.selectedJob)

  useEffect(() => {
    dispatch(selectJob())
  }, [dispatch])

  return (
    <>
      {selectedJob === null ? (null): (
        <Card className="m-5 p-5 selected-job-card">
          <h2>{selectedJob.title}</h2>
          <h6>{selectedJob.company}</h6>
          <h6>{selectedJob.pay}</h6>
          <p>{selectedJob.description}</p>
        </Card>
        
      )}
    </>
  )
}

export default SelectedJob
