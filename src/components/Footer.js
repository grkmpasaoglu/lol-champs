import React from 'react'
import { useContext } from 'react'
import { FooterContext } from '../context/FooterContext'


const Footer = () => {
    const {name} = useContext(FooterContext)
    return (
        <div className='text-center text-3xl bg-blue-500'>
            <h2>
                Merhaba ben Footerdan gelen, {name}
            </h2>
        </div>
    )
}

export default Footer