import React from 'react'
import '../css/conversations.css'
import {ListGroup} from 'react-bootstrap'
import {useConversations} from '../contexts/ConversationsProvider'

const Conversations = () => {

  const {conversations, selectConversationIndex } = useConversations()
  return (
    <ListGroup className="message-sidebar overflow-auto flex-grow-1 conversations-content" variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item 
          key={index}
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(index)}
        >
          {conversation.recipients.map(recipient => recipient.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Conversations
