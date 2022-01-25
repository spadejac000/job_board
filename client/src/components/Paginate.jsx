import React from 'react'
import {Pagination} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../css/paginate.css'

const Paginate = ({pages, page, keyword = ''}) => {
  console.log('pages: ', pages)
  return pages > 1 && (
    <Pagination
      className="pagination-bar flex-wrap"
    >
      {[...Array(pages).keys()].map(x => (
        <Link
          className="pagination-link"
          key={x + 1} 
          to={keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}`}
        >
          <div className="pagination-box" active={x+1 === page}>{x+1}</div>
        </Link>
      ))}
    </Pagination>
  )
}

export default Paginate
