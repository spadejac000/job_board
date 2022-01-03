import React from 'react'
import '../css/messages-box.css'
import {FaComments} from 'react-icons/fa'
import {Accordion, ListGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const MessagesBox = () => {
  return (
    <Accordion className="messages-box">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="messages-box-header"><h5 className="messages-box-title"><FaComments/> Messages</h5></Accordion.Header>
        <Accordion.Body className="messages-accordion-body-container">
          <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item><Link to="/messages">See all in Messages</Link></ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default MessagesBox
