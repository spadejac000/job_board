import {useState, useEffect} from 'react'
import {Badge, Card, Row, Col, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {selectJob} from '../actions/jobActions'
import '../css/job.css'
import {FaHeart, FaBan, FaTimes, FaArrowRight} from 'react-icons/fa'
import {addJobToFavorites, deleteFavoriteJob} from '../actions/jobActions'
import {motion, AnimatePresence} from 'framer-motion'
import {Link} from 'react-router-dom'


const Job = ({job, isAuthenticated}) => {

  const [showSignIn, setShowSignIn] = useState(false);
  const [viewBanCard, setViewBanCard] = useState(false)
  const {benefits, city, work_address, job_location, job_title, job_type, salary, zip, _description, _state, date_posted, job_id, company_name, test_job} = job

  const [heartRed, setHeartRed] = useState(localStorage.getItem(`heart-red-${job_id}`));

  const dispatch = useDispatch()

  let today = new Date();
  let datePosted = new Date(date_posted.replace(' ', 'T'));
  let timeDiff = today.getTime() - datePosted.getTime()
  let timeDivider = 1000 * 60 * 60 * 24;
  let datePostedInDays = Math.floor(timeDiff / timeDivider)

  let userID = useSelector((state) =>
    state.user.userID
  )

  const handleAddJobToFavorites = (e, jobID) => {
    e.preventDefault()
    e.stopPropagation();
    if(isAuthenticated) {
      if(heartRed === 'true') {
        localStorage.setItem(`heart-red-${job_id}`, false)
        setHeartRed(localStorage.getItem(`heart-red-${job_id}`))
        dispatch(deleteFavoriteJob(userID, jobID))
      } else if(heartRed === 'false') {
        localStorage.setItem(`heart-red-${job_id}`, true)
        setHeartRed(localStorage.getItem(`heart-red-${job_id}`))
        dispatch(addJobToFavorites(jobID, userID))
      } else {
      }
    } else {
      setShowSignIn(true)
    }
  }

  const handleBanJob = (e) => {
    e.stopPropagation();
    if(isAuthenticated) {
      setViewBanCard(true)
    } else {
      setShowSignIn(true)
    }
    
  }

  const handleExitShowSignIn = (e) => {
    e.preventDefault()
    e.stopPropagation();
    setShowSignIn(false)
  }

  return (
    viewBanCard ?
    <AnimatePresence>
      <motion.div 
        key={job_id}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
      >
    <Card className="p-4 job-card">
      <div className="ban-card-content">
        <h5>Job Removed</h5>
        <Button onClick={() => setViewBanCard(false)}>Undo</Button>
      </div>
    </Card>
    </motion.div>
    </AnimatePresence>
    :
    <Card className="p-4 job-card" onClick={()=> dispatch(selectJob(job))}>
      <Row>
        <Col md={10}>
          <h2>{job_title}</h2>
          <h6>{company_name}</h6>
          <h6>{city}, {_state}</h6>
          <Badge className="salary-badge" bg="primary">${salary}</Badge>
          <p>Posted {datePostedInDays === 0 ? 'today' : datePostedInDays === 1 ? 'yesterday' : `${datePostedInDays} days ago`}</p>
          {test_job === true ? <h3><Badge>Test Job!</Badge></h3> : null}
        </Col>
        <Col md={2} className="save-ban-col">
          <div onClick={(e) => handleAddJobToFavorites(e, job_id)}>
            <FaHeart className={heartRed === 'true' ? 'heart-job-red' : ''}/>
          </div>
          <div onClick={(e) => handleBanJob(e)}>
            <FaBan/>
          </div>
        </Col>
      </Row>
      <>
        {showSignIn ? 
          <Card className="sign-in-pop-up" onClick={(e) => e.stopPropagation()}>
            <div className="exit-sign-in-pop-up" onClick={(e) => handleExitShowSignIn(e)}>
              <FaTimes/>
            </div>
            
            <h5>Sign In to add job to favorites</h5>
            <Button>Sign In <FaArrowRight /></Button>
            <p>
              No account yet? <Link to='/register'>Create account</Link>
            </p>
          </Card>
        : null}
      </>
    </Card>
  )
}

export default Job
