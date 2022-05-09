import React, {useState, useEffect} from 'react'
import '../css/settings.css'
import {useDispatch, useSelector} from 'react-redux'
import {getTheme, updateTheme} from '../actions/themeActions'
import {Card, Button} from 'react-bootstrap'
import {deleteAccount} from '../actions/userActions'
import {toast} from 'react-toastify'
import ResetPasswordModal from './ResetPasswordModal'

const Settings = ({setAuth, isAuthenticated}) => {
  
  const dispatch = useDispatch();

  let userID = useSelector((state) =>
    state.user.userID
  )

  let theme = useSelector((state) =>
    state.getTheme.userTheme
  )

  const [userTheme, setUserTheme] = useState(theme)
  const [themeToggleChecked, setThemeToggleChecked] = useState(userTheme === 'light' ? false : userTheme === 'dark' ? true : false)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getTheme(userID))
  }, [theme])

  const themeToggler = () => {
    userTheme === 'light' ? dispatch(updateTheme('dark', userID)) && setUserTheme('dark'): dispatch(updateTheme('light', userID)) && setUserTheme('light');
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
          <input 
            className="toggle-theme-input" 
            type="checkbox" 
            id="switch" 
            name="theme" 
            checked={themeToggleChecked} 
            onChange={() => themeToggler()}
          />
            <label className="theme-label" for="switch">
              Toggle
            </label>
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