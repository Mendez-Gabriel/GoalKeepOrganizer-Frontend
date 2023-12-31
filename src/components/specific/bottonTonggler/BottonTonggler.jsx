import React from 'react';
import style from './BottonTonggler.module.css';
import ButtonLink from '../butonLink/ButtonLink';
import Dropdown from '../dropdown/Dropdown';

const BottonTonggler = ({offcanvas, offcanvasHeader, handlerClick, click, activeCanv}) => {

    const { navicon, open } = style;


    return (
        <>
            <div className={`d-lg-none ${navicon} ${click ? open : ''}`} onClick={handlerClick} data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`offcanvas offcanvas-end bg-dark bg-gradient d-lg-none ${activeCanv}`} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasLabel"  data-bs-backdrop="false" data-bs-keyboard="false" data-bs-scroll="true">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{offcanvasHeader}</h5>
                    <button type="button" className={`btn-close ${navicon} ${click ? open : ''}`} onClick={handlerClick} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        {offcanvas}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default BottonTonggler;