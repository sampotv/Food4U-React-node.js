import React, { useState } from 'react';

import '../App.css';

function Register(props) {

  const { userJwt } = props
console.log(userJwt)
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ fname, setFname ] = useState('');
    const [ lname, setLname ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ isOwner, setIsOwner] = useState(); 
    const [ message, setMessage] = useState('');  // to store success or error message
  
let addSubmit = async (e) => {
    e.preventDefault();
    
 try {        
    let res = await fetch(`http://localhost:5000/user` , {
    method: 'POST',
    headers: {"Content-Type": "application/json",
  },
    body: JSON.stringify( {
        username: username,
        password: password,
        fname: fname,
        lname: lname,
        address: address,
        isOwner: isOwner,
    }),
}).then((res)=>
res.json());

    if (res.status === 200) {
        
        setUsername('');
        setPassword('');
        setFname('');
        setLname('');
        setAddress('');
        setIsOwner('');
        setMessage('Käyttäjä lisätty!');
    } else {
        setMessage("Error occured");
    }
} catch(err){
    console.log(err);

    }
};


  return (
    <div className="alignCenter">
        <p>
        Luo itsellesi uusi käyttäjätunnus
        </p>
            <form onSubmit={ addSubmit}>
                <div className='addText'>Anna käyttäjänimi: 
                  <input type="text"  value = { username} placeholder='Käyttäjätunnus' className='addBox' onChange = {(e) => setUsername(e.target.value)}></input></div>
                <div className='addText'>Anna salasana:
                  <input type="password"  value = { password }placeholder='Salasana' className='addBox' onChange = {(e) => setPassword(e.target.value)}></input></div>
                <div className='addText'>Etunimi: 
                  <input type="text" value ={ fname } placeholder='Etunimi' className='addBox' onChange = {(e) => setFname(e.target.value)}></input></div>
                <div className='addText'>Sukunimi: 
                  <input type="text" value ={ lname } placeholder='Sukunimi' className='addBox' onChange = {(e) => setLname(e.target.value)}></input></div>
                <div className='addText'>Osoite: 
                  <input type="text"  value ={ address } placeholder='Osoite' className='addBox' onChange = {(e) => setAddress(e.target.value)}></input></div>
                <div className='addText'>Käyttäjäprofiili: 
                <select className='addBox2'
                    type="text"
                    value={isOwner}
                    onChange={(e) => setIsOwner(e.target.value)}>                     
                <option value="0">Olen asiakas</option>
                <option value="1">Olen ravintoloitsija</option>
                </select>
                </div>
                <div><button className='loginButton'type='submit'>Luo käyttäjä</button></div>
                <div className="message">{message ? <p>Käyttäjätunnus luotu</p> : null}</div>
            </form>
    </div>
  )
}
export default Register;
