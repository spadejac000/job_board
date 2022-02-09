import React from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import '../css/messages.css'
import MessageSidebar from './MessageSidebar'
import {ContactsProvider} from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'
import OpenConversation from './OpenConversation'
import {useConversations} from '../contexts/ConversationsProvider'

const Messages = ({isAuthenticated}) => {
  // const {selectedConversation} = useConversations()
  const [id, setId] = '12345';
  return (
    isAuthenticated && id ?
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Container className="mb-5">
          <Row>
            <Col md={3} className="message-sidebar-col">
              <MessageSidebar/>
            </Col>
            <Col md={9}>
              <OpenConversation/>
            </Col>
          </Row>
        </Container>
      </ConversationsProvider>
    </ContactsProvider>
    : null
  )
}

export default Messages