import React from 'react'
import { motion } from 'framer-motion'

const EmptyCart = () => {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
    className='flex items-center justify-center w-full h-96 bg-zinc-100 rounded-sm shadow-lg'>
      <div className='flex flex-col items-center'>
        <h4 className='p-5 rounded-md border shadow-md bg-white'>Empty Basket?</h4> 
        <h1 className='p-5 text-3xl font-bold'>Start shopping, Search...</h1>
      </div>
    </motion.div>
  )
}

export default EmptyCart