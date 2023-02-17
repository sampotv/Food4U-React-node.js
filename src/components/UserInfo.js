import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";



export default function UserInfo(props) {
    
  const { userJwt } = props;
  const [userInfo, setUserInfo] = useState([]);
  const [history, setHistory] = useState([]);

  if (userJwt != null){
    var decoded = jwt_decode(userJwt)
  }
    

  useEffect( () => {
    async function useri() {
    const user = await fetch(`https://foodback.netlify.app/userinfo/${decoded.idUser}`)
    .then((res) =>
      res.json()
    )
    setUserInfo(user) }
    useri()

  }, [decoded.idUser]);

  useEffect( () => {
    async function order() {
    const orders = await fetch(`https://foodback.netlify.app/orders/${decoded.idUser}`).then((res) =>
      res.json()
    )
    setHistory(orders) }
      order()
  }, [decoded.idUser]);
   
  if (userJwt == null){
    return (
        <div><h2>Ole hyvä ja kirjaudu ensin sisään.</h2></div>
    )}

  if (userJwt != null){
  return (
    <div>Olet kirjautuneena käyttäjänä: 
        {userInfo.map((userInfo) => (
        <div>
            <div key={userInfo.idUser} className='restaurantHome'>
              <div className='restaurantHomeText' >{userInfo.fname } {userInfo.lname}
                </div></div></div>
                
          )) }<p>Tilaushistoriani</p>
          <div>
              {
                  history.map((history) => (
                      <div>
                          <div key={history.idUser}>RavintolaId: {history.restaurant} Tilausaika: {history.orderTime } Summa: {history.price}€  Toimitusosoite: {history.address}
                         </div>  </div> 
                  ))
              }
          </div>
    </div>
  )}
  
}

