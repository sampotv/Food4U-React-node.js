import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Restaurantss() {


  const [restaurants, setRestaurants] = useState([]);
  //const [menus, setMenus] =useState([]);

// eslint-disable-next-line
  useEffect(async () => {
    const allrestaurants = await fetch('http://localhost:5000/restaurant').then((res) =>
      res.json()
    )

    console.log(allrestaurants)
    setRestaurants(allrestaurants)
  }, []);

  
  // useEffect(async(idRestaurant) => {
  //   const oneMenu = await fetch(`http://localhost:5000/menuitem/${idRestaurant}`).then((res)=>
  //   res.json()
  //   )

  //   console.log(oneMenu)
  //   setMenus( oneMenu )
  // },[]);

  const [rest, setRest] = useState('');
  const filter = (e) => {
    const keyw = e.target.value; 
    setRest(keyw);
  };
  let filteredRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(rest.toLowerCase()) || restaurant.type.toLowerCase().includes(rest.toLowerCase()))
  
  return (
    <div className="contentWrapper">
      <div className='addBox3'><Link to="/myrestaurants/:idUser"><button className='createRestaurantButton'type='submit'>Ravintoloitsija Minun Ravintolat</button></Link></div>
      <div className="homeRestaurantSearch">
        <input
          type="search"
          value={rest}
          onChange={filter}
          className="searchBar"
          placeholder="Etsi ravintolaa nimellä tai ravintolatyypillä"
        /></div>

      <div className="marginTop">
        <div className="paddingTop">
          {filteredRestaurants.length ? filteredRestaurants.map((restaurants) => (
            <div key={restaurants.idRestaurant} className='restaurantHome'><img src={restaurants.restaurantImg} alt="Restaurant" className='restaurantImg' />
              <div className='restaurantHomeText' >{restaurants.name} <div className='restaurantHomeAddress'>{restaurants.address}</div>

                <div><Link to={`/restaurant/${restaurants.idRestaurant}`}><button className='homeMenuButton' >Avaa ravintolan ruokalista</button></Link></div></div></div>
          )) : <div><h1>Hakuehdoillasi ei löydy ravintolaa</h1></div>}

        </div>
      </div>
    </div>);
}

