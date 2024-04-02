import React from 'react'
import { Link } from 'react-router-dom'
import img from '../src/assets/not-found.svg'

const Error = () => {
  return (
    <div>
            <img src={img} alt='not found' />
            <h3>Oh!Faqja nuk u gjet!</h3>
            <p>Ju lutem shkruani adresen e sakt </p>
            <Link to='/'>Kthehu</Link>
    </div>
  )
}

export default Error