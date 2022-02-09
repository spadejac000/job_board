import React from 'react'
import '../css/contacts.css'
import {ListGroup} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'

const Contacts = () => {
  const {contacts} = useContacts()
  return (
    <ListGroup className="border-end overflow-auto flex-grow-1 contacts-content" variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Contacts
