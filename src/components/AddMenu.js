import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';

function AddMenu() {
  
  const [menus, setMenus] = useState([]);
  const [dish, setDish] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [menuItemImg, setMenuItemImg] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const { restaurantId } = useParams('');
  const [message, setMessage] = useState();  // to store success or error message

  let addSubmit = async (e) => {
    e.preventDefault();
    var setDish="Alkuruoka";
    try {
      let res = await fetch(`https://foodback.netlify.app/menuitem/${restaurantId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dish: dish,
          name: name,
          description: description,
          price: price,
          menuItemImg: menuItemImg,

        }),
      }).then((res) =>
        res.json());

      if (res.status === 200) {
        setDish('');
        setName('');
        setDescription('');
        setPrice('');
        setMenuItemImg('');

        setMessage('Annos lisätty!');
      } else {
        setMessage("Error occured");
      }
    } catch (err) {
      console.log(err);

    }
  };
 

  useEffect( () => {
    async function rest() {
    const restaurant = await fetch(`https://foodback.netlify.app/restaurant/${restaurantId}/restaurant`).then((res) =>
      res.json()
    )
    setRestaurants(restaurant) }
      rest()
  }, [restaurantId]);
  

  useEffect( () => {
    async function menu() {
    const restaurantMenu = await fetch(`https://foodback.netlify.app/restaurant/${restaurantId}/menu`)
    .then((res)=>
    res.json()
    )
    setMenus(restaurantMenu) }
    menu()
  }, [restaurantId]);


  return (
    <div className="contentWrapper">
      <div className="paddingTop">
          {restaurants.map((restaurants) => (
            <div key={restaurants.idRestaurant} className='restaurantHome'><img src={restaurants.restaurantImg} className='restaurantImg' alt="Restaurant"/>
              <div className='restaurantHomeText' >{restaurants.name}
                </div></div>
          )) }
        </div>
      <div className='createBox'><h1>Lisää uusi annos</h1></div>
      <form onSubmit={addSubmit}>
        <div className='addText'>Ruokatyyppi:
          <select className='addBox2'
            type="text"
            value={dish}
            placeholder="Annoksen tyyppi"
            onChange={(e) => setDish(e.target.value)}>
            <option value="Alkuruoka">Alkuruoka</option>
            <option value="Pääruoka">Pääruoka</option>
            <option value="Jälkiruoka">Jälkiruoka</option>
          </select></div>
        <div className='addText'>Annoksen nimi:
          <input className='addBox' required="required"
            type="text"
            value={name}
            placeholder="Annoksen nimi"
            onChange={(e) => setName(e.target.value)}
          /></div>
        <div className='addText'>Annoksen kuvaus:
          <input className='addBox' required="required"
            type="text"
            value={description}
            placeholder="Kuvaus"
            onChange={(e) => setDescription(e.target.value)}
          /></div>

        <div className='addText'>Annoksen Hinta:
          <input className='addBox' required="required"
            type="text"
            value={price}
            placeholder="Hinta"
            onChange={(e) => setPrice(e.target.value)}
          /></div>
        <div className='addText'>URL annoksen kuvaan:
          <input className='addBox'
            type="text"
            value={menuItemImg}
            placeholder="URL annoksen kuvaan"
            onChange={(e) => setMenuItemImg(e.target.value)}
          /></div>

        <div className='createBox'>

          <button className='createBox' type="submit">Luo annos</button>
        </div>
        <div className="message">{message ? <p>Annos lisätty</p> : null}</div>

      </form>
      <div>
        {menus.map(menu =>

          <div key={restaurantId.idRestaurant} className='addMenu'><img src={menu.menuItemImg} alt="Menu" className='addMenuItemImg' />{menu.name}  <div>Annoksen kuvaus: {menu.description}, Hinta: {menu.price}€
          </div></div>
        )
        }
      </div>
    </div>
  );
}
export default AddMenu;

