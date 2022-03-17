import {useState} from 'react'
import {Form, FormControl, Button, Container, InputGroup, Dropdown} from 'react-bootstrap';
import '../css/filters.css'
import {FaSearch, FaMapPin} from 'react-icons/fa'
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
      console.log('uh oh')
      navigate(`/search/what/${whatKeyword}`)
    } else if(whereKeyword.trim()) {
      console.log('yesssss')
      navigate(`/search/where/${whereKeyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Container>
      <div className="mb-5">
        <Form onSubmit={submitHandler} className="search-row d-flex navbar-search-form">
          <div className="d-flex input-group">
            <InputGroup.Text>What</InputGroup.Text>
            <FormControl
            type="search"
            placeholder="Search company name or job title..."
            className="navbar-search-input"
            aria-label="Search"
            onChange={event => {setWhatKeyword(event.target.value)}}
            />
            <InputGroup.Text><FaSearch/></InputGroup.Text>
          </div>
          <div className="d-flex input-group">
            <InputGroup.Text>Where</InputGroup.Text>
            <FormControl
            type="search"
            placeholder="Search by location..."
            className="navbar-search-input"
            aria-label="Search"
            onChange={event => {setWhereKeyword(event.target.value)}}
            />
            <InputGroup.Text><FaMapPin/></InputGroup.Text>
          </div>
          <div>
            <Button type="submit" variant="primary">Search</Button>
          </div>
        </Form>
      </div>

      <div className="filter-row">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Date Posted
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Remote
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Within 25 miles
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Salary Estimate
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Job Type
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Developer Skills
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Education Level
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Location
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Company
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Experience Level
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>


      
    </Container>
  )
}

export default Filters
