import React, {useState, useEffect} from 'react'
import '../css/settings.css'
import {useDispatch, useSelector} from 'react-redux'
import {updateTheme} from '../actions/themeActions'
import {Card, Button} from 'react-bootstrap'
import {deleteAccount} from '../actions/userActions'
import {toast} from 'react-toastify'
import ResetPasswordModal from './ResetPasswordModal'

const Settings = ({setAuth, isAuthenticated}) => {

  const [themeToggleChecked, setThemeToggleChecked] = useState(JSON.parse(localStorage.getItem('themeToggleChecked')))
  
  const dispatch = useDispatch();

  const theme = useSelector(state => 
    state.theme
  )

  let userID = useSelector((state) =>
    state.user.userID
  )

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    localStorage.setItem('theme', theme)
    localStorage.setItem('themeToggleChecked', themeToggleChecked)
  })

  const themeToggler = () => {
    theme === 'light' ? dispatch(updateTheme('dark')) : dispatch(updateTheme('light'));
    themeToggleChecked === false ? setThemeToggleChecked(true) : setThemeToggleChecked(false);
  }
  
  const handleDeleteAccount = async (e) => {
    e.preventDefault()
    try {
      if(window.confirm('Are you sure you want to delete your account?')) {
        dispatch(deleteAccount(userID))
        localStorage.removeItem('token')
        setAuth(false)
        toast.success("Your account has been deleted")
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    isAuthenticated ?
    <div className="container settings-page">
      <h1>Settings</h1>
      <Card className="theme-mode-container">
        <h3 className="theme-mode-title">Light / Dark Mode</h3>
        <div className="toggle-container">
          <input className="toggle-theme-input" type="checkbox" id="switch" name="theme" checked={themeToggleChecked} onChange={() => themeToggler()}/><label className="theme-label" for="switch">Toggle</label>
        </div>
      </Card>
      
      <Card className="theme-mode-container">
        <h3 className="theme-mode-title">Reset Password</h3>
        <div className="toggle-container">
          <Button onClick={handleShow}>Reset</Button>
        </div>
      </Card>

      <Card className="theme-mode-container">
        <h3 className="theme-mode-title">Delete Account</h3>
        <div className="toggle-container">
          <Button variant="danger" onClick={handleDeleteAccount}>Delete Account</Button>
        </div>
      </Card>
      <ResetPasswordModal show={show} handleClose={handleClose}/>
    </div>
    : null
  )
}

export default Settings
