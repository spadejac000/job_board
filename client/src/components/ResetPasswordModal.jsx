import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {updatePassword} from '../actions/userActions'

const ResetPasswordModal = ({show, handleClose}) => {

  const dispatch = useDispatch();

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
      console.log('hello there')
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



  return (
    <Modal show={show} onHide={handleClose} className='' centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitForm} className="">
          <Form.Group>
            <Form.Control className="mb-3" type="password" name="currentPassword" id="currentPassword" placeholder="Current password" value={currentPassword} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Group>
            <Form.Control className="mb-3" type="password" name="newPassword" id="newPassword" placeholder="New password" value={newPassword} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Group>
            <Form.Control className="mb-3" type="password" name="confirmNewPassword" id="confirmNewPassword" placeholder="Confirm new password" value={confirmNewPassword} onChange={e => onChange(e)}/>
          </Form.Group>
          <Button type='submit' color="primary" className="mb-3">Save</Button>
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
