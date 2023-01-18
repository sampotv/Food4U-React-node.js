import React from 'react'
import Restaurantss from './Restaurantss'
export default function RestaurantView(props) {
  return (
<div className="">  
    { props.restaurant.map(p => <Restaurantss name={p.name} type={p.type} price={p.pricerange}/>) }
</div>
  )
}
