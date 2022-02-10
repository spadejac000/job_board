import React, {useState} from 'react'
import {Tabs, Tab, Button, Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'
import '../css/message-sidebar.css'

const MessageSidebar = () => {
  
  const CONVERSATIONS_KEY = 'conversations'
  const CONTACTS_KEY = 'contacts'
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const conversationsOpen = activeKey === CONVERSATIONS_KEY
  const [modalOpen, setModalOpen] = useState(false)

  let id = '12345'

  const handleTabSelect = (key) => {
    if (key === CONVERSATIONS_KEY) {
      setActiveKey(CONVERSATIONS_KEY)
    } else if (key === CONTACTS_KEY) {
      setActiveKey(CONTACTS_KEY)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Tabs className="message-sidebar-tabs justify-content-center" defaultActiveKey={CONVERSATIONS_KEY} onSelect={handleTabSelect}>
        <Tab eventKey={CONVERSATIONS_KEY} title="Conversations">
          <Conversations/>
        </Tab>
        <Tab eventKey={CONTACTS_KEY} title="Contacts">
          <Contacts/>
        </Tab>
      </Tabs>
      <div className="message-sidebar-btn-div small d-grid">
        <Button className="rounded-0" onClick={() => setModalOpen(true)}>New {conversationsOpen ? 'Conversation' : 'Contact'}</Button>
      </div>
      

      <Modal show={modalOpen} onHide={closeModal}>
        {
          conversationsOpen ? 
          <NewConversationModal closeModal={closeModal}/> : <NewContactModal closeModal={closeModal}/>
        }
      </Modal>
    </>
  )
}

export default MessageSidebar
