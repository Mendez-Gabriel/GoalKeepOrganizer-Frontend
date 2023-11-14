import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/specific/navbar/NavBar';
import Footer from './components/specific/footer/Footer';
import Gallery from './pages/Gallery/Gallery';
import Administrator from './pages/Administrator/Administrator';
import AboutUs from './components/specific/aboutUs/AboutUs';
import CardsIntegrantes from './components/specific/Integrantes/Integrantes';
import FootballFields from './pages/FootballFields/FootballFields';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductItem from './pages/productItem/ProductItem';
import Login from './components/specific/login/Login';
import Register from './components/specific/register/Register';
import { useState, useEffect } from 'react';
import Reservations from './pages/Reservations/Reservations';
import PaginaError404 from './components/general/paginaError404/PaginaError404'


function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if(userStorage){
      setUser(JSON.parse(userStorage));
    }
  
  }, []);


  return (
    <BrowserRouter>
    <NavBar setUser={setUser} user={user}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>       
        <Route path='/canchas' element={<FootballFields user={ user }/>}/>
        <Route path='/canchas/:id' element={<Reservations user={ user }/>}/>
        <Route path='/galeria' element={<Gallery/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/admin' element={<Administrator user={user}/>}/>
        <Route path='/Fundadores' element={<CardsIntegrantes/>}/>
        <Route path='/product/:id' element={<ProductItem  user={user}/>}/>
        <Route path='/user/login' element={<Login setUser={setUser} user={user}/>} />
        <Route path='/user/register' element={<Register/>}/>
        <Route path='*' element={<PaginaError404/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App;
