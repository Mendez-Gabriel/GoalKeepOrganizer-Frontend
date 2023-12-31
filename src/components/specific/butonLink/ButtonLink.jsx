import React from 'react';
import { Link } from 'react-router-dom';

const ButtonLink = ({ Text, link, className, dismiss, handlerClick, click }) => {

  return (
      <div>
          <li className="nav-item mx-3 py-2 d-flex">
              <Link to={link} className={`nav-link active ${className} text-light`} data-bs-dismiss={dismiss} onClick={click}><strong style={{fontWeight:'400' }} className='d-flex align-middle fst-italic'>{Text}</strong></Link>
          </li>
      </div>
  )
}

export default ButtonLink;