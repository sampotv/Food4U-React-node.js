import React from 'react'
import { Link } from 'react-router-dom'
import siteLogo from './food4u_logo_001_vaalea_100px.png';

export default function Footer() {
    return (
        <div className='footerWrapper'>
            <div className='footer1'>
                <Link to="/"><img src={siteLogo} width="293" height="100" alt="Food 4 U" /></Link>
                <p>Löydät meidät myös puhelinluettelosta!</p>
            </div>
            <div className='footer2'>
                <p>Pienellä präntätyt asiat</p>
                <p>Saavutettavuusraportti</p>
                <p>Lakijutut ja muu byrokratia</p>
            </div>
            <div className='footer3'>
                <p>Ploki</p>
                <p>Some</p>
                <p>ATK-tukikanava</p>

            </div>
        </div>
    )
}