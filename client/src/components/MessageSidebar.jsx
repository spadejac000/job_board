import React, {useState} from 'react'
import {Tabs, Tab, Button} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'

const MessageSidebar = () => {
  
  const CONVERSATIONS_KEY = 'conversations'
  const CONTACTS_KEY = 'contacts'
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const conversationsOpen = activeKey === CONVERSATIONS_KEY

  let id = '12345'

  const handleTabSelect = (key) => {
    if (key === CONVERSATIONS_KEY)
      setActiveKey(CONVERSATIONS_KEY)
    else if (key === CONTACTS_KEY)
      setActiveKey(CONTACTS_KEY)
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
      <Button>New {conversationsOpen ? 'Conversation' : 'Contact'}</Button>
    </>
  )
}

export default MessageSidebar
