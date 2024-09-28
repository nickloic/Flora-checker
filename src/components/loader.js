import React from 'react';
import { Typewriter } from 'react-simple-typewriter'


export default function Loader() {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen backdrop-blur-sm bg-white/30 flex justify-center items-center flex-col z-40">
            <div className="w-5 h-5 bg-soft-green rounded-full animate-bounce-custom"></div>
            <Typewriter
                words={['Identification...']}
                loop={false}
                cursor
                cursorStyle='_'
            />
        </div>
    );
}
