import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notification: '',
    showNotification: false,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload
        },
        setShowNotification: (state, action) => {
            state.showNotification = action.payload
        }
    }
})

export const { setNotification, setShowNotification } = notificationSlice.actions

export default notificationSlice.reducer