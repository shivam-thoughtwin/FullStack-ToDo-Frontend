import React from 'react'
import "./error.scss";

const Errors = ({errors, touched}) => {
  return (
    <div className='err-text'>{errors && touched ? errors : null}</div>
  )
}

export default Errors