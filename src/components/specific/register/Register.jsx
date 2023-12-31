import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Register.module.css';
import iconLogo from '../../../assets/Icon/Icon.svg'
import Input from '../../general/input/Input';
import axios from 'axios';
import { FaEyeSlash, FaEye } from 'react-icons/fa6';
import InputReact from '../../general/inputReact/InputReact';
import AlertError from '../../general/alertError/AlertError';

const Register = ({ user }) => {

    const { card, img, logoIconStyle, bgImage, textTitle, createButton, createButtonSubmit } = style;
    const imageMessi = 'https://res.cloudinary.com/dptlgyfq5/image/upload/v1699462256/Login_oqbqnz.jpg';

    const url = import.meta.env.VITE_APP_URL_BASE
    const BaseApi = `${url}/user/register`;

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [activeEye, setActiveEye] = useState(false);
    const [dataForm, setDataForm] = useState({
        name: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        email: '',
    });

    const handleChange = (event) => {
        const { value, name } = event.target;

        setDataForm((dataForm) => ({
            ...dataForm,
            [name]: value
        }));
        setError(null)
    };

    const handleClick2 = () => {
        setRegistrationSuccess(false);
    }

    const handleClick = (click) => {
        if (!activeEye) {
            setActiveEye(true)
        } else {
            setActiveEye(false)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(BaseApi, dataForm)
            .then((response) => {
                if (response.status !== 200) throw new Error('No se pudo realizar la peticion');
                setRegistrationSuccess(true)
            })
            .catch((err) => {
                setError(err.response.data.error);
            })

        event.target.reset();
    };

    useEffect(() => {
        const handleGoBack = () => {
            setRegistrationSuccess(false);
        };

    }, [registrationSuccess]);

    return (
        <div className='mt-5' tabIndex={'2'}>
            <div className={`${card}`}>
                <div className="row g-0 vh-100">
                    <div className="col-2 col-sm-4 col-md-7 col-xxl-9">
                        <img src={imageMessi} className={`img-fluid vh-100 ${img}`} />
                    </div>
                    <div className={`col-10 col-sm-8 col-md-5 col-xxl-3 d-flex align-items-center ${bgImage}`}>
                        <div className="container">
                            {registrationSuccess ?
                                (
                                    <div className='text-center'>
                                        <h1 className={`fw-bold fst-italic ms-3 ${textTitle}`}>Se Registro con exito</h1>
                                        <button className={`mt-5 ${createButtonSubmit}`}>
                                            <Link to={'/user/login'} className={`text-light mx-2 link-underline link-underline-opacity-0`}>
                                                Ir a Inicia sesion
                                            </Link>
                                        </button>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        <div className='d-flex justify-content-center m-2 mb-5 '>
                                            <img src={iconLogo} className={logoIconStyle} alt="" />
                                            <h1 className={`text-light fw-bold fst-italic ms-3 ${textTitle}`}>GoalKeep Organizer</h1>
                                        </div>
                                        <form className='m-3 needs-validation' onSubmit={handleSubmit} noValidate>
                                            <Input margin={'mt-2'} placeholder={'Nombre'} setSearchProduct={handleChange} type={'text'} name={'name'} />
                                            <Input margin={'mt-2'} placeholder={'Apellido'} setSearchProduct={handleChange} type={'text'} name={'lastName'} />
                                            <Input margin={'mt-2'} placeholder={'Usuario'} setSearchProduct={handleChange} type={'text'} name={'userName'} />
                                            <InputReact placeholder={'Contraseña'} margin={'mt-2'} type={activeEye ? 'text' : 'password'} handleChange={handleChange} handleClick={handleClick} text={activeEye ? <FaEye /> : <FaEyeSlash />} name={'password'} className={createButton} />
                                            <Input margin={'mt-2 mb-2'} placeholder={'Confirmar Contraseña'} setSearchProduct={handleChange} type={'password'} name={'confirmPassword'} />
                                            <Input margin={'mt-2 mb-2'} placeholder={'Email'} setSearchProduct={handleChange} type={'email'} name={'email'} />
                                            {error && (
                                                <AlertError setError={setError} error={error} />
                                            )}
                                            <button type="submit" className={` mt-1 ${createButtonSubmit}`}>Finalizar Registro</button>
                                        </form>
                                        <div className='container d-flex mt-5 pt-1'>
                                            <p className={`d-flex fw-bold ${textTitle}`}>
                                                Ya tienes cuenta?
                                                <Link to={'/user/login'} className='text-light mx-2 link-underline link-underline-opacity-0'>
                                                    Inicia sesion
                                                </Link>
                                            </p>
                                        </div>
                                    </>
                                )

                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;