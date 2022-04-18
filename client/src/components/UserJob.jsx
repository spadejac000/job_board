import React, {useState} from 'react'
import {Card, Badge, Button, Row, Col} from 'react-bootstrap'
import {FaEdit, FaTimes, FaFile} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import EditJobModal from './EditJobModal'
import {getUserJobs} from '../actions/jobActions'
import {Link} from 'react-router-dom'
import '../css/user-job.css'

const UserJob = ({job}) => {

  const dispatch = useDispatch();

  let userID = useSelector((state) =>
    state.user.userID
  )

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editUserJob = async (id) => {
    try {
      
    } catch (error) {
      console.error(error.message)
    }
  }

  const deleteUserJob = async (id) => {
    try {
      if(window.confirm('Are you sure you want to delete this job?')) {
        const deleteUserJob = await fetch(`/api/jobs/${id}`, {
          method: "DELETE"
        })
        // userJobs.filter(job => job.job_id !== id)
        dispatch(getUserJobs(userID))
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <div key={job.job_id} className="">
        <Row className="user-job-row g-0">
          <Col>
            <p className="user-job-data">{job.job_title}</p>
          </Col>
          <Col>
            <p className="user-job-data">{job.company_name}</p>
          </Col>
          <Col>
            <p className="user-job-data">{job.job_location}</p>
          </Col>
          <Col>
            <p className="user-job-data">{job.job_type}</p>
          </Col>
          <Col>
            <p className="user-job-data">{job.city} {job._state}</p>
          </Col>
          <Col>
            <div className="user-job-actions-container user-job-data">
              <Link to={`/applicants/${job.job_id}`} className="btn btn-primary"><FaFile/></Link>
              <Button variant="warning" onClick={handleShow}><FaEdit onClick={() => editUserJob(job.job_id)}/></Button>
              <Button variant="danger" onClick={() => deleteUserJob(job.job_id)}><FaTimes/></Button>
            </div>
          </Col>
        </Row>
        <hr className="my-0"/>
      </div>
      <EditJobModal job={job} show={show} handleClose={handleClose} editUserJob={editUserJob}/>
    </div>
    
  )
}

export default UserJob
