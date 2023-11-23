import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { infoSection, button, infoCard } from './Reservations.module.css'
import TurnPicker from '../../components/specific/TurnPicker/TurnPicker';
import { Trash3Fill, XOctagon } from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);





const Reservations = ({ user }) => {

    const { loginUser } = user;
    const [userData, setUserData] = useState(loginUser.userPasswordHidden)
    const [userTurns, setUserTurns] = useState([]);
    const params = useParams();
    const urlBase = import.meta.env.VITE_APP_URL_BASE
    const apiUrl = `${urlBase}/footballFields`
    const [fieldData, setFieldData] = useState({});
    const queryParams= { footballFieldId : params.id };
    const [ocuppiedTurns, setOcuppiedTurns] = useState([]);
    const [startHour, setStartHour] = useState('');
    const [endingHour, setEndingHour] = useState('');
    const [day, setDay] = useState('')
    const [reload, setReload] = useState(false);

    const handleReservation = async () =>{
      if(!startHour||!endingHour||!day){
        alert('Por favor elija fecha y horario');
        return
      }
      if(confirm('Seguro que desea realizar esta reserva?')){
        const dataForm = {
          user: userData._id,
          footballField: params.id,
          day: day,
          hour:{
            start: startHour,
            end: endingHour
          }
        };
        try {
          const { data } = await axios({
            method:'post',
            url:`${urlBase}/reservation`,
            data: dataForm
          });
          alert(`Reserva realizada para el dia ${dataForm.day} de ${dataForm.hour.start} a ${dataForm.hour.end}hs`);
          setReload(!reload);
        } catch (error) {
          alert('Fecha no disponible');
          console.log(error);
        };
      }else alert('Operacion cancelada.')
    };
    const handleCancelation = async (id) => {
      if(confirm('Desea cancelar el turno?')){
        try {
          const { data } = await axios({
            method:'delete',
            url:`${urlBase}/reservation`,
            params:{ reservationId : id}
          });
          setReload(!reload);
        } catch (error) {
          console.log(error)
        }
      }else alert('Operacion Cancelada')
    }

    useEffect(()=>{
      const fetchReservationData = async () => {
        try {
          const { data } = await axios({
            method:'get',
            url:`${urlBase}/reservation`,
            params:{day: day, footballField: params.id}
          });
          setOcuppiedTurns(data.reservations);
        } catch (error) {
          console.log(error)
        }
      }
      if(day)fetchReservationData();
    },[day])
    useEffect(()=>{
      const fetchFieldData = async () => {
        try {
          const  {data}  = await axios({
            method:'get',
            url: apiUrl,
            params:queryParams
          });
          setFieldData(data.footballFields[0]);
        } catch (error) {
          console.log(error);
        }
      }
      const fetchUserReservations = async () => {
        try {
          const { data } = await axios({
            method: 'get',
            url: `${urlBase}/reservation`,
            params: { user: userData._id, footballField: params.id }
          });
          setUserTurns(data.reservations);
        } catch (error) {
          console.log(error);
        }
      }
      fetchUserReservations();
      fetchFieldData();
    },[reload]);
  return (
    <>
      <section className={`${infoSection} align-items-center container-fluid justify-content-center row mt-5 py-5 px-0 mx-0`}>
        <div className={`${infoCard} justify-content-center align-items-start row col-md-7 col-12 mx-0  p-4 gap-5`}>
          <div className='col-12 p-0 ratio ratio-16x9'>
            <img src={fieldData.imgUrl} alt={fieldData.name} className='img-fluid'/>
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item text-center'><strong>{fieldData.name?.toUpperCase()}</strong></li>
            <li className='list-group-item'><strong>Cesped:</strong> {fieldData.grassType}</li>
            <li className='list-group-item'><strong>Jugadores:</strong> {fieldData.players}</li>
            <li className='list-group-item'><strong>Mis turnos:</strong></li>
            {
              userTurns.length===0
              ?
              <li className='list-group-item'>No tienes turnos en esta cancha</li>
              :
              userTurns.map((turn) => (
                <li key={turn._id} className='list-group-item'>{`Dia ${dayjs.utc(turn.day).add(1,'day').tz('America/Argentina/Buenos_Aires').format('DD [de] MMM[,] YYYY')} de ${turn.hour.start} a ${turn.hour.end}hs `}
                  <XOctagon size={25} color='red' role='button' onClick={()=>handleCancelation(turn._id)} /></li>
              ))
            }      
          </ul>
        <h3 className='text-center mt-5'>Elija Fecha y Horario</h3>
          <TurnPicker
            setDay={setDay}
            setStart={setStartHour}
            setEnd={setEndingHour}
            disabledTurns={ocuppiedTurns}
          />
          <button className={`col-10 ${button}`} onClick={handleReservation}>Realizar Reserva</button>
        </div>
      </section>
    </>
  )
}

export default Reservations