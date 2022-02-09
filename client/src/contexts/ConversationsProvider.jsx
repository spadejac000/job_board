import React, {useContext, useState} from 'react'
import {useContacts} from './ContactsProvider'

const ConversationsContext = React.createContext()

export const useConversations = () => {
  return useContext(ConversationsContext)
}

export const ConversationsProvider = ({id, children}) => {
  const [conversations, setConversations] = useState([])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const {contacts} = useContacts()

  const createConversation = (recipients) => {
    setConversations(previousConversations => {
      return [...previousConversations, {recipients, messages: []}]
    })
  }

  const addMessageToConversation = ({recipients, text, sender}) => {
    setConversations(previousConversations => {
      let madeChange = false
      const newMessage = {sender, text}
      const newConversations = previousConversations.map(conversation => {
        if(arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation, messages: [...conversation.messages, newMessage]
          }
        }
        return conversation
      })


      if(madeChange) {
        return newConversations
      } else {
        return [...previousConversations, {recipients, messages: [newMessage]}]
      }
    })
  }

  const sendMessage = (recipients, text) => {
    addMessageToConversation({recipients, text, sender: id})
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return {id: recipient, name}
    })
    const messages = conversations.messages !== undefined ? conversations.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return {...message, senderName: name, fromMe}
    })
    : null
    const selected = index === selectedConversationIndex
    return {...conversation, messages, recipients, selected}
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

const arrayEquality = (a, b) => {
  if(a.length !== b.length) {
    return false
  } else {
    a.sort()
    b.sort()
    return a.every((element, index) => {
      return element === b[index]
    })
  }
}