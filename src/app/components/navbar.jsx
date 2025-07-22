import React from 'react'
import { FaMoon } from "react-icons/fa";

export default function Navbar() {
    return (
        <>
            <div className='bg-sidebar justify-between items-center flex'>
                <div>
                    <img src="navbar-icon.svg" alt="" />
                </div>
                <div className='flex h-full'>
                    <div className='p-[26px] pr-[24px]'>
                    <FaMoon className='w-[20px] h-[20px] text-[#7e88c3]'/>
                    </div>
                    <div className='w-[1px] bg-[#494E6E]'>
                    </div>
                    <div className='p-[20px] pr-[24px]'>
                    <img src="user.svg" alt="" />
                    </div>
                </div>

            </div>
        </>

    )
}
