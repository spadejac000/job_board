import {useState} from 'react'
import {Form, FormControl, Button, Container, InputGroup} from 'react-bootstrap';
import '../css/filters.css'
import { useNavigate } from 'react-router-dom';

const Filters = () => {

  let navigate = useNavigate()

  const [whatKeyword, setWhatKeyword] = useState('')
  const [whereKeyword, setWhereKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if(whatKeyword.trim() && whereKeyword.trim()) {
      navigate(`/search/${whatKeyword}/${whereKeyword}`)
    } else if(whatKeyword.trim()) {
      navigate(`/search/what/${whatKeyword}`)
    } else if(whereKeyword.trim()) {
      navigate(`/search/where/${whereKeyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Container>
      <div className="mb-5">
        <Form onSubmit={submitHandler} className="search-row navbar-search-form">
          <div className="d-flex input-group what-search-input-group">
            <InputGroup.Text>What</InputGroup.Text>
            <FormControl
            type="search"
            placeholder="Search company name or job title..."
            className="navbar-search-input"
            aria-label="Search"
            onChange={event => {setWhatKeyword(event.target.value)}}
            />
          </div>
          <div className="d-flex input-group where-search-input-group">
            <InputGroup.Text>Where</InputGroup.Text>
            <FormControl
            type="search"
            placeholder="Search by location..."
            className="navbar-search-input"
            aria-label="Search"
            onChange={event => {setWhereKeyword(event.target.value)}}
            />
          </div>
          <div>
            <Button type="submit" variant="primary">Search</Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default Filters
