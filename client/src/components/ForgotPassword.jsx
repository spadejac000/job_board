import React from 'react'
import {Container, Form, Button, Card} from 'react-bootstrap'
import '../css/forgot-password.css'
import {Link} from 'react-router-dom'

const ForgotPassword = () => {

  const onChange = () => {
    console.log('helllooooo')
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    console.log('hello')
  }

  return (
    <Container className="mt-5 forgot-password-container">
      <Card className="forgot-password-card">
        <Card.Header>
          <Card.Title>Forgot Password</Card.Title>
        </Card.Header>
        <Form onSubmit={onSubmitForm} className="">
          <Form.Group className="p-3">
            <Form.Label>Email</Form.Label>
            <Form.Control className="mb-3 w-25" type="email" name="email" id="exampleEmail" placeholder="Email" value='{email}' onChange={e => onChange(e)}/>
          </Form.Group>
          <Card.Footer>
            <Link to="/login" className="btn btn-secondary me-2">Cancel</Link>
            <Button type='submit' color="primary" className="" >Submit</Button>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  )
}

export default ForgotPassword
