import React from 'react'
import {Pagination} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import '../css/paginate.css'

const Paginate = ({pages, page, whatKeyword = '', whereKeyword = ''}) => {
  const navigate = useNavigate();
  return pages > 1 && (
    <Pagination
      className="pagination-bar flex-wrap d-flex justify-content-center"
    >
      {[...Array(pages).keys()].map(x => (
          <Pagination.Item 
            key={x}
            onClick={() => navigate(whatKeyword || whereKeyword ? `/search/${whatKeyword}/${whereKeyword}/page/${x+1}` : `/page/${x+1}`)}
            className="pagination-box" 
            active={x+1 === page}
          >
            {x+1}
          </Pagination.Item>
      ))}
    </Pagination>
  )
}

export default Paginate
