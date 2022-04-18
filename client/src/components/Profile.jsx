import React from 'react'
import {Container, Card} from 'react-bootstrap'
import {useSelector} from 'react-redux'

const Profile = () => {

  let user = useSelector((state) => {
    if(state.user.userFirstName) {
      return state.user
    } else {
      return null
    }
  })

  return (
    <Container>
      <h1 className="text-center mb-4">{user.userFirstName} {user.userLastName}</h1>
      <Card className="p-3 mb-3">
        <h3>Get Started</h3>
      </Card>
      <Card className="p-3 mb-3">
        <h3>Contact Information</h3>
      </Card>
    </Container>
  )
}

export default Profile
