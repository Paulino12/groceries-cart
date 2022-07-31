import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    ingredient: '',
    groceries: [],
    isLoading: false,
    showGroceries: false,
    error: ''
}

const axiosOptions = (searchQuery) => {
    return {
        method: 'GET',
        url: `https://caterers-groceries.herokuapp.com/search/${searchQuery}`
    }
}

export const getGroceries = createAsyncThunk('ingredient/getGroceries', async (name, thunkAPI) => {
    const str = name.ingredient
    const newStr = str.replace(/\(([^)]+)\)/g, '')
    try {    
        // const regex = new RegExp(name.ingredient, 'gi')
        //i.e when adding product, ingredient input reset to empty,
        if(!name.ingredient && name.supplier === 'all') return initialState.groceries // therefore avoid a 404 error
        const res = await axios.request(axiosOptions(newStr))
        if(name.supplier === 'all'){
            return res.data
        }else{
            const groceriesBySupplier = res.data.filter((grocery) => grocery.vendorName === name.supplier)
            return groceriesBySupplier
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setIngredient: (state, action) => {
            state.ingredient = action.payload
        },
        setGroceries: (state) => {
            state.groceries = []
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setShowGroceries: (state, action) => {
            state.showGroceries = action.payload
        },
    },
    extraReducers: {
        [getGroceries.pending]: (state) => {
            state.isLoading = true
        },
        [getGroceries.fulfilled]: (state, action) => {
            state.groceries = action.payload
            state.showGroceries = true
            state.isLoading = false
        },
        [getGroceries.rejected]: (state, action) => {
            // show errors only related to network
            if(action.payload === "Network Error"){
                state.error = "Could not load ingredients. Please check your internet connection."
            }else{
                state.error = ""
            }
            state.isLoading = false
        }
    }
})

export const { setIngredient, setGroceries, setIsLoading, setShowGroceries, setDynamicMessage } = ingredientSlice.actions

export default ingredientSlice.reducer

