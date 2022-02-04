import React, {useState} from 'react'
import {Alert} from 'react-bootstrap'

const AlertMessage = ({variant, children, alertMessageShow, setAlertMessageShow}) => {

  if(alertMessageShow) {
    return (
      <Alert variant={variant} onClose={() => setAlertMessageShow(false)} dismissible>
        {children}
      </Alert>
    )
  }
  return null;
}

AlertMessage.defaultProps = {
  variant: 'info'
}

export default AlertMessage
