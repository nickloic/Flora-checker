import React from 'react'
import * as FaIcons from 'react-icons/fa'


export default function Navbar() {
    return (
        <div>
            <div className='flex justify-between w-10/12 m-auto max-sm:hidden'>
                <div>
                    <button type='button' className='w-fit bg-soft-green p-2 rounded-full'>
                        Rate the app
                    </button>
                </div>
                <div className='flex gap-2 items-center'>
                    <FaIcons.FaLeaf className='text-soft-green' />
                    <p>Flora-checker</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='w-fit h-fit border-2 rounded-full border-soft-black p-2'>
                        <FaIcons.FaHeart />
                    </div>
                    <button><a href='https://portfolio-loic-nick.vercel.app/' target='blank' className='text-soft-green'>Contacter le devellopeur</a></button>
                </div>
            </div>
            {/* ecrant sm */}
            <div className='hidden max-sm:block'>
                <div className='flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <FaIcons.FaLeaf className='text-soft-green' />
                        <p>Flora-checker</p>
                    </div>
                    <div className='flex flex-row gap-1 items-center justify-center text-xs'>
                        <button><a href='https://portfolio-loic-nick.vercel.app/' target='blank' className='text-soft-green'>Contacter le devellopeur</a></button>
                        <div className='w-fit h-fit '>
                            <FaIcons.FaHeart className='text-xs'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
