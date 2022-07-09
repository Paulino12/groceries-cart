import React, { createContext, useState } from 'react'

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {

    const [qtyInputs, setQtyInputs] = useState({})
    const [data, setData] = useState({})

    const handleInputs = (e, id, productDescription, vendorName, vendorCode, price, packSize) => {
        setQtyInputs((prevState) => ({
            ...prevState, 
            [id]: !e.target.value || e.target.value < 0 ? 0 : parseInt(e.target.value) //in case no value or negative return 0
        }))
        setData((prevState) => ({...prevState, [id]: {
            _id: id, productDescription, vendorName, vendorCode, price, packSize, quantity: !e.target.value ? 0 : parseInt(e.target.value)
        }}))
    }

    return (
        <CartContext.Provider value={{ qtyInputs, setQtyInputs, data, setData, handleInputs }}>
            { children }
        </CartContext.Provider>
    )
}

export default CartContextProvider