import React, { useEffect } from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { amount } = useSelector((store) => store.cart)
    return (
        <>
            <nav className="bg-gray-800 w-full z-20 fixed">
                <div className="px-16">
                    <div className="flex items-center justify-between h-12">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center text-white">
                                <div className='hidden sm:flex sm:flex-row sm:items-baseline'>
                                    <a href="https://www.maryoctav.com" target="_blank" rel='noreferrer' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                        Octav
                                    </a>
                                </div>
                            </div>
                            <div className='w-full flex flew-row justify-end'>
                                <div className="flex space-x-4">
                                    <div className='flex items-center text-white rounded-md text-sm font-medium'>
                                        <div className='relative'>
                                            <ShoppingBasketIcon fontSize='large' />
                                            <div className={`absolute -top-1 -right-2 bg-red-600 rounded-full px-2 text-sm font-extrabold`}>
                                                {amount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar