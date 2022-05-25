import React from 'react'
import { IoApps } from 'react-icons/io5'

interface ILogo{
    title:string
}

const logo: React.FC <ILogo> = ({title}) => {
    return (
        <>
                <IoApps size={30}/>
                <h3 className='text-white text-base md:text-xl lg:text-2xl ps-2 font-satisfy'>{title}</h3>  
        </>
    )
}

export default logo
