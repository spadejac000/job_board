import {useState} from 'react'
import {Form, Button, InputGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import '../css/register.css';
import {toast} from 'react-toastify'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

const Register = ({setAuth}) => {

  const [passwordType, setPasswordType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const {firstName, lastName, email, password, confirmPassword} = inputs

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const checkPasswordValidation = (e) => {
    if(password === e.target.value) {
      console.log('hello it works')
    }
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if(password !== confirmPassword) {
        toast.error("Passwords do not match")
      } else {
        const body = {firstName, lastName, email, password}
        const response = await fetch('/api/users/register', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        })
        const parseResponse = await response.json()
        if(parseResponse.token) {
          localStorage.setItem("token", parseResponse.token)
          setAuth(true)
          toast.success("Registered successfully!")
        } else {
          setAuth(false)
          toast.error(parseResponse)
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handlePasswordVisibility = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
    showPassword === false ? setShowPassword(true) : setShowPassword(false)
  }

  return (
    <div className="register-form-container">
      <div className="register-brand-container">
        <div>
          <h1 className="register-brand-title">Job Board</h1>
          <h3 className="register-brand-slogan">The number one job listing app to help you land your dream career!</h3>
        </div>
      </div>
      <div className="register-form-actual-container">
        <Form onSubmit={onSubmitForm} className="register-form">
          <h2 className="register-form-title">Register</h2>
          <Form.Group>
            <Form.Control className="mb-3" type="text" name="firstName" id="first-name-register" placeholder="First name" value={firstName} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Group>
            <Form.Control className="mb-3" type="text" name="lastName" id="last-name-register" placeholder="Last name" value={lastName} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Group>
            <Form.Control className="mb-3" type="email" name="email" id="email-register" placeholder="Email" value={email} onChange={e => onChange(e)} />
          </Form.Group>
          <InputGroup>
            <Form.Control className="mb-3" type={passwordType} name="password" id="password-register" placeholder="Password" value={password} onChange={e => onChange(e)}/>
            <InputGroup.Text 
              onClick={handlePasswordVisibility} 
              className="mb-3 register-password-eye-box"
            >
              {showPassword === false ? <FaEye/> : <FaEyeSlash/>}
            </InputGroup.Text>
          </InputGroup>
          <InputGroup>
            <Form.Control className="mb-3" type={passwordType} name="confirmPassword" id="confirm-password-register" placeholder="Confirm password" value={confirmPassword} onChange={e => onChange(e)}/>
            <InputGroup.Text 
              onClick={handlePasswordVisibility} 
              className="mb-3 register-password-eye-box"
            >
              {showPassword === false ? <FaEye/> : <FaEyeSlash/>}
            </InputGroup.Text>
          </InputGroup>
          <Button type="submit" className="mb-3 btn-primary">Register</Button>
          <div>Have an account? <Link to={'/login'}>Login</Link></div>
        </Form>
      </div>
    </div>
  )
}

export default Register