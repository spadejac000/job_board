import React from 'react'
import {Row, Col, Card, Container} from 'react-bootstrap'
import {FaComments} from 'react-icons/fa'
import '../css/messages.css'
import MessageSidebar from './MessageSidebar'

const Messages = ({isAuthenticated}) => {
  return (
    isAuthenticated ?
    <Container className="mb-5">
      <Row>
        <Col md={4} className="message-sidebar-col">
          <MessageSidebar/>
        </Col>
        <Col md={8}>
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
    : null
  )
}

export default Messages
