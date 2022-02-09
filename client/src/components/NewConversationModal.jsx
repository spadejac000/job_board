import React, {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'

const NewConversationModal = ({closeModal}) => {
  const [selectedContactIds, setSelectedContactIds] = useState([])
  const {contacts} = useContacts()
  const {createConversation} = useConversations()

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactIds)
    closeModal()
  }

  const handleCheckboxChange = (contactId) => {
    setSelectedContactIds(previousSelectedContactIds => {
      if(previousSelectedContactIds.includes(contactId)) {
        return previousSelectedContactIds.filter(prevId => { return contactId !== prevId})
      } else {
        return [...previousSelectedContactIds, contactId]
      }
    })
  }
  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              >

              </Form.Check>
            </Form.Group>
          ))}
          <Button className="mt-3" type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewConversationModal
