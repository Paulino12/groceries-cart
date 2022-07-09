import React from 'react'
import { motion } from 'framer-motion'
import CircularProgress from '@mui/material/CircularProgress'

function Preloader({ loadMessage }) {
    return (
        <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
            duration: 1,
            ease: "easeInOut"
          }}
        className={`absolute rounded-md top-0 left-0 h-full w-full bg-white flex flex-col items-center justify-center text-amber-900 z-10`}>
            <div>
                <CircularProgress color='secondary' />
            </div>
            <div className='text-lg font-semibold capitalize'>
                {loadMessage}
            </div>
        </motion.div>
    )
}

export default Preloader