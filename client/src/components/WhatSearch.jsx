import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Form, FormControl, InputGroup} from 'react-bootstrap'
import {FaSearch} from 'react-icons/fa'

const WhatSearch = () => {

  let navigate = useNavigate()

  const [keyword, setkeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className="d-flex input-group navbar-search-form">
      <InputGroup.Text>What</InputGroup.Text>
      <FormControl
        type="search"
        placeholder="Search"
        className="navbar-search-input"
        aria-label="Search"
      />
      <InputGroup.Text><FaSearch/></InputGroup.Text>
    </Form>
  )
}

export default WhatSearch
