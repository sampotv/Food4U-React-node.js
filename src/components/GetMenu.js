import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from "axios";
import jwt_decode from "jwt-decode";


export default function GetMenu (props) {

    const [cartItems, setCartItems] = useState([]);
    const [menus, setMenus] =useState([]);
    const {restaurantId} = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const itemsPrice = cartItems.reduce((a, c) => a + 1 * c.price, 0);
    const delPrice = 3.90;
    const totalPrice = itemsPrice + delPrice;
    const [address, setAddress] = useState("");
    const { userJwt } = props
    
  if(userJwt != null) {
    
    var decoded = jwt_decode(userJwt);
}

    
// eslint-disable-next-line
    useEffect(async () => {
      const restaurant = await fetch(`http://localhost:5000/restaurant/${restaurantId}/restaurant`).then((res) =>
        res.json()
      )
      
      console.log(restaurant)
      console.log(userJwt)
      setRestaurants(restaurant)
      // eslint-disable-next-line
    }, []);
  
    const addOrder = () => {
     Axios.post(`http://localhost:5000/order/:idUser`, {
         amount: cartItems.length,        
         price: totalPrice,
         address: address,
         idUser: decoded.idUser,
         restaurant: restaurantId
    }).then(() =>{
      console.log("success");
    });
  };
      
   console.log(restaurantId);

    // eslint-disable-next-line
  useEffect(async() => {
    const restaurantMenu = await fetch(`http://localhost:5000/restaurant/${restaurantId}/menu`).then((res)=>
    res.json()

    )

    console.log(restaurantMenu)
    setMenus(restaurantMenu)
    // eslint-disable-next-line
  }, []);
    
  

  const [menuItemFilter, setRest] = useState('');
  const filter = (e) => {
    const keyw = e.target.value;
    setRest(keyw);
  };

  let filteredMenuItems = menus.filter(menuItem => menuItem.name.toLowerCase().includes(menuItemFilter.toLowerCase()) || menuItem.description.toLowerCase().includes(menuItemFilter.toLowerCase()))

  const addToCart = (menu) => {
    setCartItems([...cartItems, {...menu}]);
  };

  const removeFromCart = (menuToRemove) => {
    setCartItems(
      cartItems.filter((menu) => menu !== menuToRemove)
      );
  };


  return (
    <div className="contentWrapper">

      {restaurants.map(rest =>

        <>
          <div className='restaurantMainImg' style={{ backgroundImage: `url(${rest.restaurantImg})`, backgroundRepeat: 'no-repeat' }}> </div>
          <div className='restaurantDetails'>
            <div><h1 className='restaurantName'>{rest.name}</h1></div>
            <div><i class="fas fa-money-bill-alt"></i>{rest.pricerange} <i class="fas fa-tags"></i>{rest.type}</div>
            <div><i class="fas fa-map-marked" />{rest.address} <i class="fas fa-clock"></i>{rest.openingHours}</div>
          </div>
          <div className="restaurantMenuFunctions">
            <div className="menuSearch"><input type="search" value={menuItemFilter} onChange={filter} className="" placeholder="Etsi ruokalistalta" /></div>
            
          </div>
        </>
      )}
     
      <div className="restaurantMenuDisplay">

      
            <div className="dish">
              
              <div className="menuDishItems">

                {filteredMenuItems.length ? filteredMenuItems.map((menus) => (
                  <>
                    <div className="itemWrapper">
                      <div className="dishItem">
                        <div className="dishImg" style={{ backgroundImage: `url(${menus.menuItemImg})`, backgroundRepeat: 'no-repeat' }}></div>
                        <div className="dishDetails">
                          <strong>{menus.name}</strong>
                          <p>{menus.description}</p>
                          <p>{menus.price} €</p>
                        </div>
                        <div className="addToCartIcon"><i onClick={() => addToCart(menus)} class="fas fa-cart-plus" /></div>

                      </div>
                    </div>
                  </>
                )) : <div>Tällaista annosta ei löydy, koita jotain muuta hakusanaa.</div>
                }
              </div>
            </div>
     
      </div>
    
    <div className="cart">
    <h2>Ostoskori</h2>
      
      {cartItems.length === 0 && <div className='cart-item-name'>Ostoskorisi on tyhjä</div>}
      {cartItems.map((item) => (
        <div key={item.id}>
          <div className="cart-item-name">{item.name} {item.price.toFixed(2)}€
          <button className ="removebtn" onClick={() => removeFromCart(item)}><i class="fas fa-trash" /></button>
          
            
          </div>
          </div>
      ))}

      {cartItems.length !== 0 && (
        <>
          <hr />
          <div className="cart-price-name">Ostokset:</div>
          <div className="cart-price-price">{itemsPrice.toFixed(2)}€</div>
         
          <div className="cart-price-name">Toimituskulut:</div>
          <div className="cart-price-price"> {delPrice.toFixed(2)}€ </div>
          
          <hr />
          <div className="total">
            <strong>Yhteensä:</strong>
          </div>
            <div className="totalPrice">
              <strong>{totalPrice.toFixed(2)}€</strong>
            </div>
          
          <hr />
          
        
          <div className='cartAddress'>
          <input className='loginInsertBox' required="required"
            type="text"
            value={address}
            placeholder ="Toimitusosoite"
            onChange={(e) => setAddress(e.target.value)}
          /></div>
          
          <div className="cartbtns">
          <Link to ="/" title="Peruuta"><button className="continuebtn">Peruuta</button></Link>
          <Link to ="Order"><button onClick={ addOrder } className="paybtn">Maksa</button></Link>
          </div>
        </>
      )}
    </div>
  </div>
  );
}

