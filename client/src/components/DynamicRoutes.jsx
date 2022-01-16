import React from 'react'
import {useParams} from 'react-router'

const DynamicRoutes = () => {
  const {id} = useParams();
  return (
    <div>
      Dynamic page - {id}
    </div>
  )
}

export default DynamicRoutes
