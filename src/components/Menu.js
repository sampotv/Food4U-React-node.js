import React from 'react'
import {useState, useEffect} from 'react';


export default function Menu (props) {

const [RMenu, setMenu] =useState([]);



  useEffect(async() => {
    const RMenu = await fetch('http://localhost:5000/menuitem').then((res)=>
    res.json()
    )
    
    console.log(RMenu)
    setMenu( RMenu )
  },[]);

  return (

    

    <div className="">
        { RMenu.map ( rlista => <div className='MenuHome'> <img src={ rlista.menuItemImg} className='menuItemImg'/>
        <div className='MenuHomeText' > { rlista.dish } { rlista.name } {rlista.desc} { rlista.price} </div>
       <div className='homeMenuButton' ><button>Lisää tuote ostoskoriin</button></div></div>)} 
        
    </div>);   
}