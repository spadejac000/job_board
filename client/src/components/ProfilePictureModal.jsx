import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

const ProfilePictureModal = ({showEditProfileImg, handleEditProfilImgClose}) => {

  const [setShowEditProfileImg] = useState(false);

  const handleImageInputChange = (e) => {
    console.log('hello')
  }

  return (
    <Modal show={showEditProfileImg} onHide={handleEditProfilImgClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={console.log('hello')}>
          <Form.Group controlId="formProfileImg" className="mb-3">
            <Form.Control 
              type="file" 
              name="resume" 
              onChange={handleImageInputChange} 
              // value={resumeInputState} 
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
