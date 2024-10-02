import React from 'react'
import * as FaIcons from 'react-icons/fa'


export default function Footer() {
  return (
   <div>
     <div className='flex justify-between w-11/12 absolute bottom-0 left-20 p-5 max-sm:hidden'>
      <div>
        <p>Your plant our priority</p>
      </div>
      <div className='flex gap-5'>
        <FaIcons.FaGlobe className='text-3xl text-soft-green'/>
        <FaIcons.FaLeaf className='text-3xl text-soft-green'/>
        <FaIcons.FaRobot className='text-3xl text-soft-green'/>
      </div>
        <ul className='flex gap-2'>
            <li>Github</li>
            <li>Twitter</li>
            <li>Linkdr</li>
        </ul>
    </div>
    {/* ecrant sm */}
    <div className='hidden max-sm:block'>
      {/* <div className='flex w-10/12 backdrop-blur-sm bg-white/30 text-soft-black p-3 text-3xl justify-between rounded-full fixed bottom-5 left-8 shadow-lg'>
        <div><FaIcons.FaHome/></div>
        <div><FaIcons.FaCamera/></div>
        <div><FaIcons.FaSearch/></div>
      </div> */}
    </div>
   </div>
  )
}
