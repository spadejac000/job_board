import {useState} from 'react'
import {Form, Button, InputGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import '../css/register.css';
import {toast} from 'react-toastify'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

const Register = ({setAuth}) => {

  const [passwordType, setPasswordType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

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

  const validateFirstName = () => {
    if(firstName === "") {
      setFirstNameError("Please enter your first name")
    } else {
      setFirstNameError("")
    }
  }

  const validateLastName = () => {
    if(lastName === "") {
      setLastNameError("Please enter your last name")
    }
  }

  const validateEmail = () => {
    if(email !== "/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/") {
      setEmailError("Please enter a valid email")
    }
  }

  const validatePassword = () => {
    if(password.length < 7) {
      setPasswordError("Please enter a valid password")
    }
  }

  const validateConfirmPassword = () => {
    if(confirmPassword < 7) {
      setConfirmPasswordError("Please confirm password")
    } else {
      setConfirmPasswordError("")
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
          <Form.Group className="mb-3" hasValidation>
            <Form.Control  
              type="text" 
              name="firstName" 
              id="first-name-register" 
              placeholder="First name" 
              value={firstName} 
              onChange={e => onChange(e)}
              required
              onBlur={() => validateFirstName()}
              isInvalid={firstNameError === "" ? false : true}
              isValid={firstName.length > 0 ? true : false}
            />
            <Form.Control.Feedback type={firstNameError === "" ? "valid" : "invalid"}>
              {firstNameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" hasValidation>
            <Form.Control 
              type="text" 
              name="lastName" 
              id="last-name-register" 
              placeholder="Last name" 
              value={lastName} 
              onChange={e => onChange(e)}
              required
              onBlur={() => validateLastName()}
              isInvalid={lastNameError === "" ? false : true}
              isValid={lastName.length > 0 ? true : false}
            />
            <Form.Control.Feedback type={lastNameError === "" ? "valid" : "invalid"}>
              {lastNameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control 
              type="email" 
              name="email" 
              id="email-register" 
              placeholder="Email" 
              value={email} 
              onChange={e => onChange(e)} 
              required
              onBlur={() => validateEmail()}
              isInvalid={emailError === "" ? false : true}
              isValid={email.length > 0 ? true : false}
            />
            <Form.Control.Feedback type={emailError === "" ? "valid" : "invalid"}>
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>
          <InputGroup className="mb-3">
            <Form.Control 
              type={passwordType} 
              name="password" 
              id="password-register" 
              placeholder="Password" 
              value={password} 
              onChange={e => onChange(e)}
              required
              onBlur={() => validatePassword()}
              isInvalid={passwordError === "" ? false : true}
              isValid={password.length > 0 ? true : false}
            />
            <InputGroup.Text 
              onClick={handlePasswordVisibility} 
              className="register-password-eye-box"
            >
              {showPassword === false ? <FaEye/> : <FaEyeSlash/>}
            </InputGroup.Text>
            <Form.Control.Feedback type={passwordError === "" ? "valid" : "invalid"}>
              {passwordError}
            </Form.Control.Feedback>
          </InputGroup>
          
          <InputGroup className="mb-3" hasValidation>
            <Form.Control 
              type={passwordType} 
              name="confirmPassword" id="confirm-password-register" 
              placeholder="Confirm password" 
              value={confirmPassword} 
              onChange={e => onChange(e)} 
              required
              onBlur={() => validateConfirmPassword()}
              isInvalid={confirmPasswordError === "" ? false : true}
              isValid={confirmPassword.length > 0 ? true : false}
            />
            <InputGroup.Text 
              onClick={handlePasswordVisibility} 
              className="register-password-eye-box"
            >
              {showPassword === false ? <FaEye/> : <FaEyeSlash/>}
            </InputGroup.Text>
            <Form.Control.Feedback type={confirmPasswordError === "" ? "valid" : "invalid"}>
              {confirmPasswordError}
            </Form.Control.Feedback>
          </InputGroup>

          <Button type="submit" className="mb-3 btn-primary">Register</Button>
          <div>Have an account? <Link to={'/login'}>Login</Link></div>
        </Form>
      </div>
    </div>
  )
}

export default Register