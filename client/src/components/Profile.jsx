import React, {useState, useEffect} from 'react'
import {Container, Card, Button, Form, ListGroup} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import axios from 'axios'
import '../css/profile.css'
import {Image} from 'cloudinary-react'
import {FaEdit, FaFile, FaEllipsisV} from 'react-icons/fa'
import ProfilePictureModal from './ProfilePictureModal'
import EditContactInfoModal from './EditContactInfoModal'
import { Document, Page} from 'react-pdf';

const Profile = () => {

  const [showResumeOptions, setShowResumeOptions] = useState(false)
  const [showEditProfileImg, setShowEditProfileImg] = useState(false);
  const handleEditProfilePictureShow = () => setShowEditProfileImg(true);
  const handleEditProfilImgClose = () => setShowEditProfileImg(false);
  const [resumeInputState, setResumeInputState] = useState('');
  const [selectedResume, setSelectedResume] = useState('');
  const [showSource, setShowSource] = useState('');
  const [profileImage, setProfileImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
  const [showProfilePicSource, setShowProfilePicSource] = useState('')
  const [showEditContactInfo, setShowEditContactInfo] = useState(false)
  const handleEditContactInfoClose = () => setShowEditContactInfo(false)
  const handleShowEditContactInfo = () => setShowEditContactInfo(true)
  const [alertMsg, setAlertMsg] = useState('')

  // maybe
  const [resumeId, setResumeId] = useState('')

  // get user resume from back end
  const loadResume = async () => {
    try {
      const res = await fetch('/api/users/get-user-resume')
      const data = await res.json()
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

  // functions that handle submitting a resume
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
      setAlertMsg(error)
    }
  }

  // resume options like deleting uploaded resume
  const handleUploadedResumeOptions = (e) => {
    e.preventDefault()
    setShowResumeOptions(true)
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
              {showProfilePicSource ?
                <img src={showProfilePicSource} alt=""/>
                :
                <img src={profileImage} alt=""/>
              }
              
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
      <Card className="mb-3">
        <Card.Header>
          <h3>Get Started</h3>
        </Card.Header>
        <Card.Body>
        <Form className="" onSubmit={handleSubmitResume}>
          <Form.Group controlId="formResume" className="mb-3">
            <Form.Label>UPLOAD A RESUME</Form.Label>
            <Form.Control 
              type="file" 
              name="resume" 
              onChange={handleResumeInputChange} 
              // value={resumeInputState} 
              className="form-resume-input"/>
          </Form.Group>
          <Button className="btn mb-3" type="submit">
            Upload Resume
          </Button>
        </Form>
        {showSource && (
          <div>
            <div className="profile-resume-uploaded-container">
              <div>
                <p><strong>Resume</strong></p>
                <div className="profile-resume-file-info-div">
                  <FaFile className="profile-resume-file-icon"/>
                  <p>File Name</p>
                </div>
                
              </div>
              <div>
                <FaEllipsisV
                  className="profile-resume-options-ellipsis" 
                  onClick={(e) => handleUploadedResumeOptions(e)}
                />
              </div>
            </div>
            <>
              {showResumeOptions ? 
                <ListGroup>
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              : null}
            </>
          </div>
        )}
        </Card.Body>
      </Card>
      <Card className="mb-3 profile-contact-info-card">
        <Card.Header className="profile-contact-info-card-header">
          <h3>Contact Information</h3>
          <h3 
            onClick={handleShowEditContactInfo}
            className="edit-contact-info-btn"
          >
            <FaEdit/>
          </h3>
        </Card.Header>
        <Card.Body>
          <p>{user.userEmail}</p>
          <p>Add phone number</p>
        </Card.Body>
      </Card>
      <ProfilePictureModal 
        showEditProfileImg={showEditProfileImg} handleEditProfilImgClose={handleEditProfilImgClose}
        showProfilePicSource={showProfilePicSource}
        setShowProfilePicSource={setShowProfilePicSource}
      />
      <EditContactInfoModal
        showEditContactInfo={showEditContactInfo} handleEditContactInfoClose={handleEditContactInfoClose}
      />
    </Container>
  )
}

export default Profile