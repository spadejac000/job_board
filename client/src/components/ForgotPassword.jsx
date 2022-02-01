import React from 'react'
import {Container, Form, Button} from 'react-bootstrap'

const ForgotPassword = () => {

  const onChange = () => {
    console.log('helllooooo')
  }

  const onSubmitForm = () => {
    console.log('hello')
  }

  return (
    <Container className="mt-5">
      <h1>Forgot Password</h1>
      <Form onSubmit={onSubmitForm} className="">
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control className="mb-3 w-25" type="email" name="email" id="exampleEmail" placeholder="Email" value='{email}' onChange={e => onChange(e)}/>
        </Form.Group>
        <Button type='submit' color="primary" className="mb-3" >Submit</Button>
      </Form>
    </Container>
  )
}

export default ForgotPassword
