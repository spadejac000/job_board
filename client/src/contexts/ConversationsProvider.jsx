import React, {useContext, useState} from 'react'
import {useContacts} from './ContactsProvider'

const ConversationsContext = React.createContext()

export const useConversations = () => {
  return useContext(ConversationsContext)
}

export const ConversationsProvider = ({children}) => {
  const [conversations, setConversations] = useState([])
  const {contacts} = useContacts()

  const createConversation = (recipients) => {
    setConversations(previousConversations => {
      return [...previousConversations, {recipients, messages: []}]
    })
  }

  const formattedConversations = conversations.map(conversation => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return {id: recipient, name}
    })
    return {...conversation, recipients}
  })

  const value = {
    conversations: formattedConversations,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
