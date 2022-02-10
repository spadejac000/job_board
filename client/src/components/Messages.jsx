import React from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import '../css/messages.css'
import MessageSidebar from './MessageSidebar'
import {ContactsProvider} from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'
import OpenConversation from './OpenConversation'
import {useConversations} from '../contexts/ConversationsProvider'
import { SocketProvider } from '../contexts/SocketProvider'

const Messages = ({isAuthenticated}) => {
  // const {selectedConversation} = useConversations()
  const [id, setId] = '12345';
  return (
    isAuthenticated && id ?
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <div className="">
            <Row>
              <Col md={3} className="message-sidebar-col">
                <MessageSidebar/>
              </Col>
              <Col md={9} className="message-conversation-col">
                <OpenConversation/>
              </Col>
            </Row>
          </div>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
    : null
  )
}

export default Messages