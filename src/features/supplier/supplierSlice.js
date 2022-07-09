import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    supplier: 'all'
}

const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {
        setSupplier: (state, action) => {
            state.supplier = action.payload
        }
    }
})


export const { setSupplier } = supplierSlice.actions

export default supplierSlice.reducer