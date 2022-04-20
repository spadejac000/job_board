import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import AlertMessage from './AlertMessage';

const ProfilePictureModal = ({
  showEditProfileImg, 
  handleEditProfilImgClose,
  showProfilePicSource,
  setShowProfilePicSource
}) => {

  const [profilePicInputState, setProfilePicInputState] = useState('')
  const [selectedProfilePic, setSelectedProfilePic] = useState('')
  const [alertMsg, setAlertMsg] = useState('')

  const handleImageInputChange = (e) => {
    const profilePic = e.target.files[0]
    showProfilePic(profilePic)
  }

  const showProfilePic = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setShowProfilePicSource(reader.result)
    }
  }

  const handleSubmitProfilePic = (e) => {
    e.preventDefault()
    if(!showProfilePicSource) return;
    uploadProfilePic(showProfilePicSource)
  }

  const uploadProfilePic = async (base64EncodedImage) => {
    try {
      await fetch('/api/users/upload-profile-pic', {
        method: 'POST',
        body: JSON.stringify({data: base64EncodedImage}),
        headers: {'Content-Type': 'application/json'}
      })
    } catch (error) {
      console.error(error)
      setAlertMsg(error)
    }
  }

  return (
    <Modal show={showEditProfileImg} onHide={handleEditProfilImgClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertMsg ? <AlertMessage variant="danger">{alertMsg}</AlertMessage> : null}
        <Form onSubmit={handleSubmitProfilePic}>
          <Form.Group controlId="formProfileImg" className="mb-3">
            <Form.Control 
              type="file" 
              name="resume" 
              onChange={handleImageInputChange} 
              value={profilePicInputState} 
              className="form-resume-input"/>
          </Form.Group>
          <Button className="btn" type="submit">
            Upload Profile Image
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ProfilePictureModal