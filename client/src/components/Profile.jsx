import React, {useState, useEffect} from 'react'
import {Container, Card, Button, Form} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import axios from 'axios'
import '../css/profile.css'
import {Image} from 'cloudinary-react'
import {FaEdit} from 'react-icons/fa'
import ProfilePictureModal from './ProfilePictureModal'

const Profile = () => {

  const [showEditProfileImg, setShowEditProfileImg] = useState(false);
  const handleEditProfilePictureShow = () => setShowEditProfileImg(true);
  const handleEditProfilImgClose = () => setShowEditProfileImg(false);
  const [resumeInputState, setResumeInputState] = useState('');
  const [selectedResume, setSelectedResume] = useState('');
  const [showSource, setShowSource] = useState('');
  const [profileImage, setProfileImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')

  // maybe
  const [resumeId, setResumeId] = useState('')

  const loadResume = async () => {
    try {
      const res = await fetch('/api/users/get-user-resume')
      const data = await res.json()
      console.log('data: ', data)
      setResumeId(data)
    } catch (error) {
      console.error(error)
    }
  }

  let user = useSelector((state) => {
    if(state.user.userFirstName) {
      return state.user
    } else {
      return null
    }
  })

  const handleResumeInputChange = (e) => {
    e.preventDefault()
    const resume = e.target.files[0]
    showResume(resume)
  }

  const showResume = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setShowSource(reader.result)
    }
  }

  const handleSubmitResume = (e) => {
    e.preventDefault();
    if(!showSource) return;
    uploadResume(showSource)
  }

  const uploadResume = async (base64EncodedResume) => {
    try {
      await fetch('/api/users/upload-resume', {
        method: 'POST',
        body: JSON.stringify({data: base64EncodedResume}),
        headers: {'Content-Type': 'application/json'}
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadResume();
  }, [])

  return (
    <Container className="profile-container">
      <div className="profile-page-id-header">
        <div className="profile-img-div-col">
          <div className="profile-img-container">
            <div className="profile-img-div">
              <img src={profileImage} alt=""/>
            </div>
            <div 
              className="profile-img-overlay" 
              onClick={handleEditProfilePictureShow}
            >
              <div>
                <h5><FaEdit/></h5>
              </div>
            </div>
          </div>
          
        </div>
        <h1 className="text-center profile-user-name">
          {user.userFirstName} {user.userLastName}
        </h1>
      </div>
      <Card className="p-3 mb-3">
        <h3>Get Started</h3>
        <Form className="mb-5" onSubmit={handleSubmitResume}>
          <Form.Group controlId="formResume" className="mb-3">
            <Form.Label>UPLOAD A RESUME</Form.Label>
            <Form.Control 
              type="file" 
              name="resume" 
              onChange={handleResumeInputChange} 
              // value={resumeInputState} 
              className="form-resume-input"/>
          </Form.Group>
          <Button className="btn" type="submit">
            Upload Resume
          </Button>
        </Form>
        {showSource && (
          <img src={showSource} alt="chosen resume" className="profile-resume-img"/>
        )}
      </Card>
      <Card className="mb-3 profile-contact-info-card">
        <Card.Header className="profile-contact-info-card-header">
          <h3>Contact Information</h3>
          <h3><FaEdit/></h3>
        </Card.Header>
        <Card.Body>
          <p>{user.userEmail}</p>
          <p>Add phone number</p>
        </Card.Body>
      </Card>
      <ProfilePictureModal 
        showEditProfileImg={showEditProfileImg} handleEditProfilImgClose={handleEditProfilImgClose}
      />
    </Container>
  )
}

export default Profile