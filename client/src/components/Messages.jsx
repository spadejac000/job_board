import React from 'react'
import {Row, Col, Card, Container} from 'react-bootstrap'
import {FaComments} from 'react-icons/fa'
import '../css/messages.css'
import MessageSidebar from './MessageSidebar'
import {ContactsProvider} from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'

const Messages = ({isAuthenticated}) => {
  const [id, setId] = '12345';
  return (
    isAuthenticated && id ?
    <ContactsProvider>
      <ConversationsProvider>
        <Container className="mb-5">
          <Row>
            <Col md={3} className="message-sidebar-col">
              <MessageSidebar/>
            </Col>
            <Col md={9}>
              <Card className="messages-right-big-card">
                <div className="messages-right-big-card-content">
                  <div>
                    <FaComments className="messages-icon-select-message"/>
                  </div>
                  <h4>You have no messages</h4>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </ConversationsProvider>
    </ContactsProvider>
    : null
  )
}

export default Messages
