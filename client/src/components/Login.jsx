import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import '../css/login.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify'

const Login = ({setAuth}) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const {email, password} = inputs

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const body = {email, password}
      const response = await fetch('/api/users/login', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      const parseResponse = await response.json()
      if(parseResponse.token) {
        localStorage.setItem("token", parseResponse.token)
        setAuth(true)
        toast.success("Logged in successfully!")
      } else {
        setAuth(false)
        toast.error(parseResponse)
      }
      
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="login-form-container">
      <div className="login-brand-container">
        <div>
          <h1 className="login-brand-title">Job Board</h1>
          <h3 className="login-brand-slogan">The number one job listing app to help you land your dream career!</h3>
        </div>
      </div>
      <div className="login-form-actual-container">
        <Form onSubmit={onSubmitForm} className="login-form">
          <h2 className="login-form-title">Login</h2>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control className="mb-3" type="email" name="email" id="exampleEmail" placeholder="Email" value={email} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control className="mb-3" type="password" name="password" id="examplePassword" placeholder="Password" value={password} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Check
            type='checkbox'
            label={`Remember Password`}
            id={`disabled-default-checkbox`}
            className="mb-3"
          />

          <Button type='submit' color="primary" className="mb-3" >Login</Button>
          <div>No account yet? <Link to={'/register'}>Register</Link></div>
        </Form>
      </div>
      
    </div>
  )
}

export default Login