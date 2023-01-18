import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default function MyRestaurants(props) {

    const { userJwt } = props
  if(userJwt != null) { 
    var decoded = jwt_decode(userJwt);
}
    const [restaurants, setRestaurants] = useState([]);
  // eslint-disable-next-line
  useEffect(async () => {
    
    const allrestaurants = await fetch(`http://localhost:5000/myrestaurants/${decoded.idUser}`)
    .then((res) =>
      res.json()
    )

    console.log(allrestaurants)
    setRestaurants(allrestaurants)
    // eslint-disable-next-line
  },[]);

if (userJwt == null){
    return (
        <div><h2>Ole hyvä ja kirjaudu ensin sisään.</h2></div>
    )}
  return (
    <div className="contentWrapper">
     
      <div className="marginTop">
        <div className="paddingTop">
        <div className='addBox3'><Link to="/addrestaurant"><button className='createRestaurantButton'type='submit'> Luo Uusi Ravintola</button></Link></div>
          {restaurants.map((restaurants) => (
            <div key={restaurants.idRestaurant} className='restaurantHome'><img src={restaurants.restaurantImg} alt="Restaurant" className='restaurantImg' />
              <div className='restaurantHomeText' >{restaurants.name} {restaurants.address}

                <div><Link to={`/addmenu/${restaurants.idRestaurant}`}><button className='homeMenuButton' >Muokkaa ravintolan ruokalistaa</button></Link></div></div></div>
          )) }

        </div>
      </div>
    </div>);
}

