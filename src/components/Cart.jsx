import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from 'react-redux'
import { setSupplier } from '../features/supplier/supplierSlice'
import { setIngredient } from '../features/ingredient/ingredientSlice'
import { setCartItems } from '../features/cart/cartSlice'
import { CartContext } from '../contexts/cartContext'

import Button from './forms/Button'
import EmptyCart from './EmptyCart'

const Cart = () => {
  const { cartItems } = useSelector((store) => store.cart) 
  const dispatch = useDispatch()

  const { qtyInputs, setQtyInputs, data, setData } = useContext(CartContext)

  const [cartDistinctSuppliers, setCartDistinctSuppliers] = useState([])
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [filteredCartitems, setFilteredCartItems] = useState([])
  const [totalCost, setTotalCost] = useState([]) 
  const [subTotal, setSubTotal] = useState([])

  useEffect(() => {
    // get distinct suppliers from cartItems
    const distinctSuppliers = cartItems.map((item) => {
      return item.vendorName
    }).filter((item, index, arr) => arr.indexOf(item) === index)
    setCartDistinctSuppliers(distinctSuppliers)

    // on component first mount show All by default
    setFilteredCartItems(cartItems)
    setSelectedSupplier("all")
    
    // calculating total cost for all suppliers
    setTotalCost(cartItems.map((item) => {
      return item.price * item.quantity
    }))

  }, [cartItems])

  useEffect(() => {
    // calculating subtotals from filtered suppliers
    setSubTotal(filteredCartitems.map((item) => {
      return item.price * item.quantity
    }))
  }, [filteredCartitems])

  // handle clicking on each supplier
  const handleSupplier = (supplier) => {
    setSelectedSupplier(supplier)
    setFilteredCartItems(cartItems.filter(elt => elt.vendorName === supplier))
  }

  const editCartItem = (ingredientId, productDescription, vendorName, vendorCode, price, packSize, quantity) => {
    dispatch(setIngredient(productDescription))
    dispatch(setSupplier(vendorName))
    setQtyInputs({...qtyInputs, [ingredientId]: quantity})
    setData({...data, [ingredientId]: { _id: ingredientId, productDescription, vendorName, vendorCode, price, packSize, quantity }})
  }

  const deleteCartItem = (ingredientId, ingredient) => {
    delete qtyInputs[ingredientId]
    delete data[ingredientId]
    dispatch(setCartItems(data))
  }

  const clearCart = () => {
    // clearing cart by passing empty object
    setQtyInputs({})
    setData({})
    dispatch(setCartItems([]))
  }

  const checkOut = () => {
    // stripe
  }

  return (
    <div className='w-full md:w-2/3 mx-auto mt-3 pb-3 relative'>
      {
        !cartItems.length ? 
        <AnimatePresence>
          <EmptyCart />
        </AnimatePresence> 
        :
        <AnimatePresence>
          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className='rounded-md shadow-lg w-full mx-auto px-1 py-3 lg:px-5 bg-white'>
            <div className='grid grid-cols-2 md:grid-cols-5 space-x-2 my-3'>
              <motion.h1 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedSupplier("all")
                setFilteredCartItems(cartItems)
              }} className={`${selectedSupplier === "all" ? 'bg-yellow-300 font-semibold' : ''} 
              hover:bg-yellow-100 hover:font-semibold cursor-pointer rounded-md p-2 text-xs flex items-center justify-center`}>
                All
              </motion.h1>
              {
                cartDistinctSuppliers.map((item, index) => {
                  return <motion.h1 key={index} 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSupplier(item)} className={`${selectedSupplier === item ? 'bg-yellow-300 font-semibold' : ''} hover:bg-yellow-100 hover:font-semibold cursor-pointer rounded-md p-2 text-xs flex items-center justify-center`}>
                    {item.substring(0, 20)}
                  </motion.h1>
                })
              }
            </div>
            <AnimatePresence exitBeforeEnter>
              <motion.div
              key={selectedSupplier}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <table className={`w-full`}>
                  <thead className='bg-black text-white'>
                    <tr>
                        <th scope="col" className="text-xs xl:text-sm font-medium text-left">
                            Ingredients
                        </th>
                        <th scope="col" className="text-xs xl:text-sm font-medium text-left">Suppliers</th>
                        <th scope="col" className="text-xs xl:text-sm font-medium text-left">Codes</th>
                        <th scope="col" className="text-xs xl:text-sm font-medium text-left">Prices</th>
                        <th scope="col" className="text-xs xl:text-sm font-medium text-left">Size</th>
                        <th scope="col" className="text-xs xl:text-sm font-medium text-left">Qty</th>
                        <th scope="col" className="text-xs xl:text-sm font-medium text-left">£/Ing</th>
                        <th scope="col" className="text-xs xl:text-sm font-medium text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filteredCartitems.map((grocery, index) => {
                        return <tr
                        className={`cursor-pointer rounded pl-3 py-1 w-full capitalize 
                        ${index % 2 ? 'bg-gray-100' : ''}`}
                        key={index}>
                          <td className='text-xs py-2'><span>{grocery.productDescription}</span></td>
                          <td className='text-xs py-2'><span>{grocery.vendorName}</span></td>
                          <td className='text-xs py-2'><span>{grocery.vendorCode}</span></td>
                          <td className='text-xs py-2'><span>£{grocery.price}</span></td>
                          <td className='text-xs py-2'><span>{grocery.packSize}</span></td>
                          <td className='text-xs py-2'><span>{grocery.quantity}</span></td>
                          <td className='text-xs py-2'><span>£{parseFloat(grocery.price * grocery.quantity).toFixed(2)}</span></td>
                          <td className='py-2 flex flex-col md:flex-row md:space-x-1 w-full h-full items-center justify-center'>
                            <motion.span
                            whileTap={{ scale: 0.9 }} 
                            className='rounded-lg p-1 bg-green-200 flex items-center justify-center' 
                            onClick={() => editCartItem(
                              grocery._id, grocery.productDescription, grocery.vendorName, grocery.vendorCode, 
                              grocery.price, grocery.packSize, grocery.quantity
                            )}>
                              <EditIcon color='success' fontSize='inherit' className='cursor-pointer' />
                            </motion.span>
                            <motion.span
                            whileTap={{ scale: 0.9 }} 
                            className='rounded-lg p-1 bg-red-200 flex items-center justify-center' onClick={() => deleteCartItem(grocery._id)}>
                              <DeleteIcon color='error' fontSize='inherit' className='cursor-pointer' />
                            </motion.span>
                          </td>
                        </tr>
                      })
                    }
                    <tr className='h-6'><td></td></tr>
                    {
                      selectedSupplier !== "all" &&
                      <tr>
                      <td></td><td></td><td></td><td></td><td></td>
                      <td className='text-sm py-2'>Sub Total:</td>
                      <td className='text-base font-semibold'>£
                        {
                          parseFloat(subTotal.reduce((acc, curr) => { return acc += parseFloat(curr)}, 0)).toFixed(2)
                        }
                      </td>
                      <td className='justify-center py-2'></td>
                    </tr>
                    }
                    {
                      selectedSupplier === "all" &&
                      <tr>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td className='text-sm py-2'>Total:</td>
                        <td className='text-base font-semibold'>£
                          {
                            parseFloat(totalCost.reduce((acc, curr) => { return acc += parseFloat(curr)}, 0)).toFixed(2)
                          }
                        </td>
                        <td className='justify-center py-2'></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>
            
            <div className='flex justify-end space-x-2'>
              {/* <Button handleClick={checkOut} btnText="Check Out" classname="text-base defaultBtn" /> */}
              <Button handleClick={clearCart} btnText="Clear Cart" classname="text-base redBtn" />
            </div>
          </motion.div>
        </AnimatePresence>
      }
    </div>
  )
}

export default Cart