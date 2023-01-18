import './App.css';
import Login from './components/Login';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Restaurantss from './components/Restaurantss';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Footer from './components/Footer';
import GetMenu from './components/GetMenu';
import AddRestaurant from './components/AddRestaurant';
import AddMenu from './components/AddMenu'
import Order from './components/Order';
import MyRestaurants from './components/MyRestaurants';
import UserInfo from './components/UserInfo';


const jwtFromStorage = window.localStorage.getItem('appAuthData');

function App ()  {

  const [ userJwt, setUserJwt ] = useState(jwtFromStorage);
  
  
 

  return (<div className='pageWrapper'>
     <div>Auth status: { userJwt != null ? "Logged in": "Not logged in" } </div>
     <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/Login" element={<Login setUserJwt={ setUserJwt } />} />
          <Route path="/Register" element={ <Register userJwt={ userJwt } />} />
          <Route path="/" element={ <Restaurantss/> } />
          <Route path="/restaurant/:restaurantId" element={ <GetMenu userJwt={ userJwt } /> } />
          <Route path="/addRestaurant" element={ <AddRestaurant userJwt={ userJwt } /> } />
          <Route path="/AddMenu/:restaurantId" element={ <AddMenu userJwt={ userJwt } /> } />
          <Route path="/myrestaurants/:idUser" element={ <MyRestaurants userJwt={ userJwt } /> } />
          <Route path="/restaurant/:restaurantId/Order" element={ <Order userJwt={ userJwt } />} />
          <Route path="/UserInfo/:idUser" element={ <UserInfo userJwt={ userJwt } /> } />
        </Routes>
      <Footer />
          
    </BrowserRouter>
    
    </div>
  );
}

export default App;
