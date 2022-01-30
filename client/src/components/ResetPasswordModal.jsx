import React, {useState} from 'react'
import {Modal, Button, Form, InputGroup} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {updatePassword} from '../actions/userActions'
import '../css/reset-password-modal.css';
import {FaEye, FaEyeSlash} from 'react-icons/fa'

const ResetPasswordModal = ({show, handleClose}) => {

  const dispatch = useDispatch();

  const [currentPasswordType, setCurrentPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [inputs, setInputs] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  const {currentPassword, newPassword, confirmNewPassword} = inputs

  let userID = useSelector((state) =>
    state.user.userID
  )

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const onSubmitForm = async () => {
    try {
      if(newPassword !== confirmNewPassword) {
        toast.error("New passwords do not match")
      } else {
        const body = {currentPassword, newPassword, confirmNewPassword}
        dispatch(updatePassword(userID, body))
        toast.success("Password successfully updated!")
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleCurrentPasswordVisibility = () => {
    currentPasswordType === 'password' ? setCurrentPasswordType('text') : setCurrentPasswordType('password')
    showCurrentPassword === false ? setShowCurrentPassword(true) : setShowCurrentPassword(false)
  }

  const handleConfirmPasswordVisibility = () => {
    confirmPasswordType === 'password' ? setConfirmPasswordType('text') : setConfirmPasswordType('password')
    showConfirmPassword === false ? setShowConfirmPassword(true) : setShowConfirmPassword(false)
  }

  return (
    <Modal show={show} onHide={handleClose} className='' centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitForm} className="">
          <InputGroup>
            <Form.Control className="mb-3" type={currentPasswordType} name="currentPassword" id="currentPassword" placeholder="Current password" value={currentPassword} onChange={e => onChange(e)}/>
            <InputGroup.Text 
              onClick={handleCurrentPasswordVisibility} 
              className="mb-3 reset-password-eye-box"
            >
              {showCurrentPassword === false ? <FaEye/> : <FaEyeSlash/>}
            </InputGroup.Text>
          </InputGroup>
          <InputGroup>
            <Form.Control className="mb-3" type={confirmPasswordType} name="newPassword" id="newPassword" placeholder="New password" value={newPassword} onChange={e => onChange(e)}/>
            <InputGroup.Text 
              onClick={handleConfirmPasswordVisibility} 
              className="mb-3 reset-password-eye-box"
            >
              {showConfirmPassword === false ? <FaEye/> : <FaEyeSlash/>}
            </InputGroup.Text>
          </InputGroup>
          <InputGroup>
            <Form.Control className="mb-3" type={confirmPasswordType} name="confirmNewPassword" id="confirmNewPassword" placeholder="Confirm new password" value={confirmNewPassword} onChange={e => onChange(e)}/>
            <InputGroup.Text 
              onClick={handleConfirmPasswordVisibility} 
              className="mb-3 reset-password-eye-box"
            >
              {showConfirmPassword === false ? <FaEye/> : <FaEyeSlash/>}
            </InputGroup.Text>
          </InputGroup>
          <Button type='submit' color="primary" className={`mb-3 ${currentPassword.length === 0 || newPassword.length === 0 || confirmNewPassword.length === 0 ? 'disabled' : ''}`}>Save</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ResetPasswordModal
