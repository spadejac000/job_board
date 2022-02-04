import React from 'react'
import {ProgressBar} from 'react-bootstrap'

const Progress = ({percentage}) => {
  if(percentage > 0) {
    return (
      <div className="mb-3">
        <ProgressBar animated now={percentage} label={`${percentage}%`}/>
      </div>
    )
  } else {
    return null
  }
}

export default Progress
