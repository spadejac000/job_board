import React from 'react'
import {Row, Col, Card, Container, ListGroup, Button} from 'react-bootstrap'
import {FaComments} from 'react-icons/fa'
import '../css/messages.css'

const Messages = ({isAuthenticated}) => {
  return (
    isAuthenticated ?
    <Container className="mb-5">
      <Row>
        <Col md={4}>
          <Card className="messages-left-card">
            <Card.Header>
              <h4>Messages</h4>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              <ListGroup.Item className="m-3 text-center"><Button>View all messages</Button></ListGroup.Item>
            </ListGroup>
          </Card>
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
