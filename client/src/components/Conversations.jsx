import React from 'react'
import '../css/conversations.css'
import {ListGroup} from 'react-bootstrap'
import {useConversations} from '../contexts/ConversationsProvider'

const Conversations = () => {

  const {conversations } = useConversations()
  return (
    <ListGroup className="border-end overflow-auto flex-grow-1 conversations-content" variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item key={index}>
          {conversation.recipients.map(recipient => recipient.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Conversations
