import React from 'react'
import { Link } from 'react-router-dom'

export default function Order() {


    

    return (
        <div className='order'>
            <div className='orderText'><h1>Kiitos</h1></div>
                <div className='orderText2'>Tilauksesi saapuu noin tunnin kuluttua</div>
                <Link to ="/" title="Sulje"><button className='endbtn'>Sulje</button></Link>
            
        </div>
    )
}