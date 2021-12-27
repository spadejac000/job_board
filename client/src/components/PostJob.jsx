import React from 'react'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import '../css/post-job.css'

const PostJob = () => {
  return (
    <Container className="post-job-form-container">
      <Form className="container mb-5 p-5 post-job-form">
        <h2 className="post-job-form-title">Post Job</h2>
        <hr/>
        <Form.Group>
          <Form.Label>Job title</Form.Label>
          <Form.Control className="mb-3" type="text" name="jobTitle" id="job-title-post-job" placeholder="Job title"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control className="mb-3" type="text" name="address" id="address-post-job" placeholder="Address"/>
        </Form.Group>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control className="mb-3" type="text" name="city" id="city-post-job" placeholder="City"/>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>State</Form.Label>
            <Form.Control className="mb-3" type="text" name="state" id="state-post-job" placeholder="State"/>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Zip code</Form.Label>
            <Form.Control className="mb-3" type="text" name="zip" id="zip-post-job" placeholder="Zip code"/>
          </Form.Group>
        </Row>
        <Form.Group>
          <Form.Label>Where the job is performed</Form.Label>
          <Form.Select className="mb-3" defaultValue="Where the job is performed">
            <option>Remote</option>
            <option>In office</option>
            <option>Hybrid</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Job type</Form.Label>
          <Form.Select className="mb-3" defaultValue="Job type">
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
          <Form.Control className="mb-3" type="text" name="salary" id="salary-post-job" placeholder="Salary"/>
        </Form.Group>
        <Form.Group style={{marginBottom: '1rem'}}>
          <h6>Benefits Offered</h6>
          <Form.Check 
            inline
            type="checkbox"
            label={`Health insurance`}
          />
          <Form.Check
            inline
            type='checkbox'
            label={`Paid time off`}
          />
          <Form.Check
            inline
            type='checkbox'
            label={`Dental Insurance`}
          />
          <Form.Check
            inline
            type='checkbox'
            label={`401(k)`}
          />
          <Form.Check
            inline
            type='checkbox'
            label={`Vision Insurance`}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label><h6>Job Description</h6></Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button type="submit" className="mb-3 btn-primary">Post Job</Button>
      </Form>
    </Container>
  )
}

export default PostJob
