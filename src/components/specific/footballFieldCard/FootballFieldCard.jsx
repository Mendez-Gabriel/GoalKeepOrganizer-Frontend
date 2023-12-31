import React from 'react';
import { useState } from 'react';
import styles from './footballFieldCard.module.css';
import { Link } from 'react-router-dom';


function FootballFieldCard({  name, grassType, players, imgUrl, id, user }) {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleLogout = () => {
      localStorage.removeItem('user');
      setShow(false);
      setUser(null);
  };

  return (
    <div className ={`col-12 p-0 ${styles.cardContainer}`}>
      <img src={ imgUrl } alt="img-estadio" />
      <div className={styles.info}>
        <h3>{ name }</h3>
        <p>Jugadores: { players }</p>
        <p>cesped: { grassType }</p>
      </div>
      <div className={styles.overlay}></div>
      {user?.loginUser.userPasswordHidden.active ?
      (<div className={`d-flex justify-content-center  ${styles.button}`}><Link to={`/canchas/${id}`}> Ver Disponibilidad </Link></div>)
      :
      (
        <>
            <div className={`d-flex justify-content-center ${styles.button}`}><Link >Solo usuarios habilitados pueden reservar</Link></div>
        </>
      ) }
      
    </div>
  )
}

export default FootballFieldCard