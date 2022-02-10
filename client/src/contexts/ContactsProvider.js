import React, {useContext, useState} from 'react'

const ContactsContext = React.createContext()

export const useContacts = () => {
  return useContext(ContactsContext)
}

export const ContactsProvider = ({children}) => {
  const [contacts, setContacts] = useState([])

  const createContact = (id, name) => {
    setContacts(previousContacts => {
      return [...previousContacts, {id, name}]
    })
  }

  return (
    <ContactsContext.Provider value={{contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}
