import React, {useState} from 'react'
import {Tabs, Tab, Button, Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

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
      <Tabs className="justify-content-center" defaultActiveKey={CONVERSATIONS_KEY} onSelect={handleTabSelect}>
        <Tab eventKey={CONVERSATIONS_KEY} title="Conversations">
          <Conversations/>
        </Tab>
        <Tab eventKey={CONTACTS_KEY} title="Contacts">
          <Contacts/>
        </Tab>
      </Tabs>
      <div className="p-2 border-top border-end small">
        Your Id: <span className="text-muted">{id}</span>
      </div>
      <Button onClick={() => setModalOpen(true)}>New {conversationsOpen ? 'Conversation' : 'Contact'}</Button>

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
