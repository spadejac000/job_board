import React from 'react'
import {Form, Button} from 'react-bootstrap'

const PostJob = () => {
  return (
    <div className="register-form-container">
      <Form className="container mb-5 card p-5 register-form shadow">
        <h2 className="register-form-title">Post Job</h2>
        <hr/>
        <Form.Group>
          <Form.Control className="mb-3" type="text" name="jobTitle" id="job-title-post-job" placeholder="Job title"/>
        </Form.Group>
        <Form.Group>
          <Form.Control className="mb-3" type="text" name="address" id="address-post-job" placeholder="Address"/>
        </Form.Group>
        <Form.Group>
          <Form.Control className="mb-3" type="text" name="city" id="city-post-job" placeholder="City"/>
        </Form.Group>
        <Form.Group>
          <Form.Control className="mb-3" type="text" name="state" id="state-post-job" placeholder="State"/>
        </Form.Group>
        <Form.Group>
          <Form.Control className="mb-3" type="text" name="zip" id="zip-post-job" placeholder="Zip code"/>
        </Form.Group>
        <Form.Group>
          <Form.Select className="mb-3" defaultValue="Where the job is performed">
            <option>Remote</option>
            <option>In office</option>
            <option>Hybrid</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
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
          <Form.Control className="mb-3" type="text" name="salary" id="salary-post-job" placeholder="Salary"/>
        </Form.Group>
        <Button type="submit" className="mb-3 btn-primary">Post Job</Button>
      </Form>
    </div>
  )
}

export default PostJob
