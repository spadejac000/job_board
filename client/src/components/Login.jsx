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
      <Form onSubmit={onSubmitForm} className="container mb-5 card p-5 login-form shadow">
        <h2 className="login-form-title">Login</h2>
        <hr/>
        <Form.Group>
          <Form.Control className="mb-3" type="email" name="email" id="exampleEmail" placeholder="Email" value={email} onChange={e => onChange(e)}/>
        </Form.Group>
        <Form.Group>
          <Form.Control className="mb-3" type="password" name="password" id="examplePassword" placeholder="Password" value={password} onChange={e => onChange(e)}/>
        </Form.Group>
        <Button type='submit' color="primary" className="mb-3" >Login</Button>
        <div>No account yet? <Link to={'/register'}>Register</Link></div>
      </Form>
    </div>
  )
}

export default Login