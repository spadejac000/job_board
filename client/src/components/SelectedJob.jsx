import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import {Card} from 'react-bootstrap'

const SelectedJob = () => {
  const dispatch = useDispatch()

  const selectedJob = useSelector((state) => state.selectedJob)
  console.log('here is state: ', selectedJob)

  useEffect(() => {
    dispatch(selectJob())
  }, [dispatch])

  return (
    <>
      {selectedJob === null ? (null): (
        <Card className="m-5 p-5" style={{position: 'sticky', top: '3rem'}}>
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
