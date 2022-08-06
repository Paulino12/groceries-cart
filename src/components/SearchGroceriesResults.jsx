import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import usePagination from '../customHooks/usePagination'
import Pagination from '@mui/material/Pagination'
import { useSelector, useDispatch } from 'react-redux'
import Input from './forms/Input'
import Button from './forms/Button'
import { setIngredient } from '../features/ingredient/ingredientSlice'
import { setSupplier } from '../features/supplier/supplierSlice'
import { setCartItems } from '../features/cart/cartSlice'

import { CartContext } from '../contexts/cartContext'
import Preloader from './Preloader'
import EmptyGroceriesResult from './EmptyGroceriesResult'

const SearchGroceriesResults = () => {
    const { cartItems } = useSelector((store) => store.cart) 

    const { qtyInputs, data, handleInputs, inputId, setInputId, showAddToBasketBtn} = useContext(CartContext)

    const { groceries, showGroceries, isLoading, dynamicMessage } = useSelector((store) => store.ingredient)
    const dispatch = useDispatch()

    const [sumQtyInputs, setSumQtyInputs] = useState(null)
    const [inputArr, setInputArr] = useState([])
    const [filteredInputArr, setFilteredInputArr] = useState([])

    useEffect(() => {
        setSumQtyInputs(Object.values(qtyInputs).reduce((acc, curr) => { return acc + curr }, 0))
        setInputArr(Object.values(qtyInputs))
        setFilteredInputArr(Object.values(qtyInputs).filter((elt) => elt !== 0))
    }, [qtyInputs])

    // Pagination Constants
    const [page, setPage] = useState(1)
    const perPage = 5
    const count = Math.ceil(groceries.length / perPage)
    const paginationData = usePagination(groceries, perPage)

    useEffect(() => {
        // when results (groceries) changes due to search
        // either through suppliers name or inputing product description
        // reset pagination to page 1 and show data of page 1
        setPage(1)
        paginationData.jump(1)
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [groceries])


    const handlePaginationChange = (e, page) => {
        setPage(page)
        paginationData.jump(page)
    }

    const addToCart = () => {
        dispatch(setCartItems(data))
        // reset form
        dispatch(setIngredient(''))
        dispatch(setSupplier("all"))
    }

    const cancelAddOrEdit = () => {
        dispatch(setIngredient(''))
        dispatch(setSupplier("all"))
        // dispatch(setShowGroceries(false))
    }


    return (
        <motion.div 
        className={`fixed w-full px-1 mt-3 md:p-0 left-0 ${showGroceries ? 'h-screen' : ''} items-center justify-center bg-black bg-opacity-70 z-10`}>
            {
                showGroceries &&
                <div>
                    {
                        !groceries.length ?
                        <EmptyGroceriesResult />
                        : 
                        <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1}}
                        exit={{opacity: 0}}
                        className='relative w-full md:w-2/3 mx-auto bg-white p-5 rounded-lg my-5'>
                            <AnimatePresence>
                                {isLoading && <Preloader loadMessage={dynamicMessage} />}
                            </AnimatePresence>
                            <div className='flex flex-col md:flex-row items-center justify-between'>
                                <div>
                                    {
                                        groceries.length > 5 &&
                                        <div className='my-3 flex flex-row items-center'>
                                            <Pagination count={count} page={page} onChange={handlePaginationChange} />
                                        </div>
                                    }
                                </div>
                                <div className='flex flex-row '>
                                    { 
                                        (inputArr.includes(0) && filteredInputArr.length) || (!inputArr.includes(0) && filteredInputArr.length) 
                                        && groceries.length ? 
                                        <div onClick={addToCart} className='mr-2'>
                                            <Button btnText="Add to Basket" classname="defaultBtn" />
                                        </div>
                                        : ''
                                    }
                                    <div onClick={cancelAddOrEdit}><Button btnText="Cancel" classname="redBtn" /></div>
                                </div>
                            </div>
                            {
                                !groceries.length ? '' :
                                <table className={`w-full mt-3`}>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-xs xl:text-sm font-medium text-left">
                                                Ingredients 
                                                <small className='px-2 ml-1 text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded'>
                                                    { groceries.length } found
                                                </small>
                                            </th>
                                            <th scope="col" className="text-xs xl:text-sm font-medium text-left">Suppliers</th>
                                            <th scope="col" className="text-xs xl:text-sm font-medium text-left">Codes</th>
                                            <th scope="col" className="text-xs xl:text-sm font-medium text-left">Prices</th>
                                            <th scope="col" className="text-xs xl:text-sm font-medium text-left">Size</th>
                                            <th scope="col" className="text-xs xl:text-sm font-medium text-left">Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            paginationData.currentData().map((item, index) => {
                                                return <tr 
                                                className={`rounded pl-3 py-1 w-full capitalize 
                                                ${index % 2 ? 'bg-gray-100' : ''}`}
                                                key={index}>
                                                <td className='text-xs py-2'>{item.productDescription}</td>
                                                <td className='text-xs py-2'>{item.vendorName}</td>
                                                <td className='text-xs py-2'>{item.vendorCode}</td>
                                                <td className='text-xs py-2'>£{item.price}</td>
                                                <td className='text-xs py-2'>{item.packSize}</td>
                                                <td className='text-xs py-2 w-12'>
                                                    <Input type="number"
                                                    min="0"
                                                    step="1"
                                                    inputName={item._id} value={qtyInputs[item._id] || '' } className="quantity" 
                                                    handleChange={(e) => handleInputs(
                                                        e, item._id, item.productDescription, item.vendorName, 
                                                        item.vendorCode, item.price, item.packSize
                                                    )} />
                                                </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            }
                        </motion.div>
                    }
                </div>
            }
            
        </motion.div>
    )
}

export default SearchGroceriesResults