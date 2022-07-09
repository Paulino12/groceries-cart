import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CancelIcon from '@mui/icons-material/Cancel'
import Button from './forms/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setSupplier } from '../features/supplier/supplierSlice'
import { setIngredient, setShowGroceries } from '../features/ingredient/ingredientSlice'
import Preloader from './Preloader'

const EmptyGroceriesResult = () => {
    const { isLoading } = useSelector((store) => store.ingredient)
    const dispatch = useDispatch()

    const clear = () => {
        dispatch(setIngredient(''))
        dispatch(setSupplier("all"))
        dispatch(setShowGroceries(false))
    }

    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}className={`relative
        p-3 w-full md:w-2/3 my-5 md:mx-auto h-auto bg-red-200
        rounded-sm shadow-md flex items-center justify-between font-semibold`}>
            <AnimatePresence>
                {isLoading && <Preloader />}
            </AnimatePresence>
            <h1 className='text-sm text-red-500 font-semibold'>No groceries match the search above.</h1>
            <motion.div 
            className='cursor-pointer' onClick={clear}>
                <CancelIcon color='error' fontSize='medium' />
            </motion.div>
        </motion.div>
    )
}

export default EmptyGroceriesResult