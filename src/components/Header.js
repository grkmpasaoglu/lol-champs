import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'


const Header = () => {
    const {deger,setDeger} = useContext(GlobalContext)
    return (
        <div className={deger === "Dark" ? "bg-black text-white" : "bg-white text-black"} style={{ height: '100vh' }}>
            <h2>Merhaba ben header'dan gelen : {deger} </h2>
            <button className='bg-black text-white' onClick={()=>setDeger(deger === "Dark" ? "Light" : "Dark")}>Tıkla</button>
        </div>
    )
}

export default Header