import {useState, Suspense} from 'react'
import {Form, Button, InputGroup} from 'react-bootstrap'
import '../css/login.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Loader from './Loader';

const Login = ({setAuth}) => {

  const [rememberUser, setRememberUser] = useState(localStorage.getItem('rememberUser') === 'true' ? true : false)
  // const [inputs, setInputs] = useState({
  //   email: localStorage.getItem('email'),
  //   password: localStorage.getItem('password')
  // })

    const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const [passwordType, setPasswordType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)

  const {email, password} = inputs

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onChangeRememberUser = async (e) => {
    localStorage.setItem('rememberUser', e.target.checked)
    setRememberUser(e.target.checked)
    await setRememberUser(!rememberUser)
    if(!rememberUser) {
      setInputs({...inputs, [e.target.name]: localStorage.getItem(e.target.name)})
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
    } else {
      localStorage.setItem('email', '')
      localStorage.setItem('password', '')
    }
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
      } else {
        setAuth(false)
        toast.error(parseResponse)
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
    <Suspense fallback={<Loader/>}>
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
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control className="mb-3" type={passwordType} name="password" id="" placeholder="Password" value={password} onChange={e => onChange(e)}/>
              <InputGroup.Text 
                onClick={handlePasswordVisibility} 
                className="mb-3 login-password-eye-box"
              >
                {showPassword === false ? <FaEye/> : <FaEyeSlash/>}
              </InputGroup.Text>
            </InputGroup>
            {/* <Form.Check
              checked={!!rememberUser}
              type='checkbox'
              label={`Remember Me`}
              className="mb-3"
              onChange={e => onChangeRememberUser(e)}
            /> */}

            <Button type='submit' color="primary" className="mb-3" >Login</Button>
            {/* <div className="mb-3">
              <Link to='/forgot-password'>Forgot password?</Link>
            </div>  */}
            <div>No account yet? <Link to={'/register'}>Register</Link></div>
          </Form>
        </div>
      </div>
    </Suspense>
  )
}

export default Login