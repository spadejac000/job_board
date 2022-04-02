import React, {useState} from 'react'
import {Container, Form, Button, Card} from 'react-bootstrap'
import '../css/forgot-password.css'
import {Link} from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const body = {email}
      const response = await fetch('/api/users/forgot-password', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      const parseResponse = await response.json()
      
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Container className="mt-5 forgot-password-container">
      <Card className="forgot-password-card">
        <Card.Header>
          <Card.Title>Reset Password</Card.Title>
          <p>Enter the email associated with your account and we'll send an email with instructions to reset your password.</p>
        </Card.Header>
        
        <Form onSubmit={onSubmitForm} className="">
          <Form.Group className="p-3">
            <Form.Label>Email</Form.Label>
            <Form.Control className="mb-3 w-25" type="email" name="email" id="exampleEmail" placeholder="Email" value={email} onChange={e => onChange(e)}/>
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
