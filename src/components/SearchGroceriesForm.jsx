import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Notification from './Notification'
import Label from './forms/Label'
import Input from './forms/Input'
import Select from './forms/Select'
import { useSelector, useDispatch } from 'react-redux'
import { setSupplier } from '../features/supplier/supplierSlice'
import { setIngredient, setGroceries, setIsLoading, getGroceries, setShowGroceries } from '../features/ingredient/ingredientSlice'
import useDebounce from '../customHooks/useDebounce'
import SearchGroceriesResults from './SearchGroceriesResults'

import { suppliers } from '../utils/suppliers'


const SearchGroceryForm = () => {
    const { ingredient } = useSelector((store) => store.ingredient)
    const { supplier } = useSelector((store) => store.supplier)
    const { showNotification } = useSelector((store) => store.notification)
 
    const dispatch = useDispatch()

    const debouncedQuery = useDebounce(ingredient, 250)

    useEffect(() => {
        dispatch(setIsLoading(true))
        // get groceries based on input and selected supplier
        if(ingredient === "") {// if empty do nothing
            dispatch(setShowGroceries(false))
            dispatch(setGroceries([]))
            return
        }
        // get groceries
        dispatch(getGroceries({ingredient, supplier}))
    }, [debouncedQuery, supplier])

    return (
        <div className='w-full md:w-2/3 px-5 md:px-0 mx-auto mt-3 relative'>
            <AnimatePresence>
                {
                    showNotification && 
                    <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity: 1, x: -25}}
                    transition={{duration: 0.5}}
                    exit={{opacity: 0, y: -50}}
                    className='absolute top-0 right-0 md:-right-60 flex justify-center h-1/2 md:h-full sm:w-2/3 md:w-96 lg:w-1/3 z-10'
                    >
                        <Notification />
                    </motion.div>
                }
            </AnimatePresence>
            <div className='flex items-center justify-center mb-3'>
                <h1 className='text-3xl font-semibold'>Caterers Ordering System</h1>
            </div>
            <form>
                <div className='flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0'>
                    <div className='w-full md:w-1/3'>
                        <Label labelFor="suppliers" text={`Suppliers`} />
                        <Select
                        className="text-xs lg:text-sm"
                        value={supplier}
                        handleChange={(e) => dispatch(setSupplier(e.target.value))} 
                        options={suppliers}
                         />
                    </div>
                    <div className='w-full md:w-2/3'>
                        <Label labelFor="ingredient" text="Ingredient" />
                        <Input
                        className="text-xs lg:text-sm"
                        type="text"
                        value={ingredient}
                        handleChange={(e) => dispatch(setIngredient(e.target.value))}
                        placeholder="Search an Ingredient" />
                    </div>
                </div>
            </form>
            <AnimatePresence>
                
                    
                    <SearchGroceriesResults />
                
                
            </AnimatePresence>
        </div>
    )
}

export default SearchGroceryForm