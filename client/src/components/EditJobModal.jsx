import React, {useState} from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import {editJob} from '../actions/jobActions'
import {useDispatch, useSelector} from 'react-redux'
import {getUserJobs} from '../actions/jobActions'

const EditJobModal = ({show, handleClose, editUserJob, job}) => {

  const dispatch = useDispatch();

  let userID = useSelector((state) =>
    state.user.userID
  )

  const [inputs, setInputs] = useState({
    jobTitle: job.job_title,
    companyName: job.company_name,
    address: job.work_address,
    city: job.city,
    zip: job.zip,
    salary: job.salary,
    description: job._description
  })

  const [dropdowns, setDropdowns] = useState({
    state: job._state,
    jobLocation: job.job_location, 
    jobType: job.job_type
  })

  const [benefits, setBenefits] = useState({
    healthInsurance: false,
    paidTimeOff: false,
    dentalInsurance: false,
    four01K: false,
    visionInsurance: false
  })

  const job_id = job.job_id

  const {jobTitle, companyName, address, city, zip, salary, description} = inputs

  const {state, jobLocation, jobType} = dropdowns

  const {healthInsurance, paidTimeOff, dentalInsurance, four01K,
    visionInsurance} = benefits

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const onChangeDropdowns = (e) => {
    setDropdowns({...dropdowns, [e.target.name] : e.target.value})
  }

  const onChangeBenefits = (e) => {
    setBenefits({...benefits, [e.target.name]: e.target.checked})
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {jobTitle, companyName, address, city, state, zip, jobLocation, jobType, salary, healthInsurance, paidTimeOff, dentalInsurance, four01K, visionInsurance, description, job_id}
      dispatch(editJob(body))
      dispatch(getUserJobs(userID))
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} className=''>
      <Modal.Header closeButton>
        <Modal.Title>Edit Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitForm} className="container mb-5 p-5 post-job-form">
          <Form.Group>
            <Form.Label>Job title</Form.Label>
            <Form.Control className="mb-3" type="text" name="jobTitle" id="job-title-post-job" placeholder="Job title" value={jobTitle} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Company name</Form.Label>
            <Form.Control className="mb-3" type="text" name="companyName" id="company-name-post-job" placeholder="Company name" value={companyName} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control className="mb-3" type="text" name="address" id="address-post-job" placeholder="Address" value={address} onChange={e => onChange(e)}/>
          </Form.Group>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control className="mb-3" type="text" name="city" id="city-post-job" placeholder="City" value={city} onChange={e => onChange(e)}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>State</Form.Label>
              <Form.Select name="state" onChange={e => onChangeDropdowns(e)} className="mb-3" value={state}>
                <option>Choose state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control className="mb-3" type="text" name="zip" id="zip-post-job" placeholder="Zip code" value={zip} onChange={e => onChange(e)}/>
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>Where the job is performed</Form.Label>
            <Form.Select name="jobLocation" onChange={e => onChangeDropdowns(e)} className="mb-3" value={jobLocation}>
              <option>Choose job location</option>
              <option>Remote</option>
              <option>In office</option>
              <option>Hybrid</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Job type</Form.Label>
            <Form.Select name="jobType" onChange={e => onChangeDropdowns(e)} className="mb-3" defaultValue={jobType}>
              <option>Choose job type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Temporary</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Commission only</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Salary</Form.Label>
            <Form.Control className="mb-3" type="text" name="salary" id="salary-post-job" placeholder="Salary" value={salary} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Group style={{marginBottom: '1rem'}}>
            <h6>Benefits Offered</h6>
            <Form.Check 
              inline
              type="checkbox"
              label="Health insurance"
              onChange={e => onChangeBenefits(e)}
              value="Health insurance"
              name="healthInsurance"
            />
            <Form.Check
              inline
              type='checkbox'
              label="Paid time off"
              onChange={e => onChangeBenefits(e)}
              value="Paid time off"
              name="paidTimeOff"
            />
            <Form.Check
              inline
              type='checkbox'
              label="Dental insurance"
              onChange={e => onChangeBenefits(e)}
              value="Dental insurance"
              name="dentalInsurance"
            />
            <Form.Check
              inline
              type='checkbox'
              label="401(k)"
              onChange={e => onChangeBenefits(e)}
              value="401(k)"
              name="four01K"
            />
            <Form.Check
              inline
              type='checkbox'
              label="Vision insurance"
              onChange={e => onChangeBenefits(e)}
              value="Vision insurance"
              name="visionInsurance"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label><h6>Job Description</h6></Form.Label>
            <Form.Control name="description" as="textarea" rows={3} defaultValue={description} onChange={e => onChange(e)}/>
          </Form.Group>
          <Button type="submit" className="mb-3 btn-primary btn-lg" onClick={handleClose}>Save Changes</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditJobModal
