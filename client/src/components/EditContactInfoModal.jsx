import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

const EditContactInfoModal = ({
  showEditContactInfo,
  handleEditContactInfoClose
}) => {
  return (
    <Modal 
      show={showEditContactInfo} 
      onHide={handleEditContactInfoClose} 
      centered
    >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditContactInfoClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditContactInfoClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default EditContactInfoModal
