import { configureStore } from '@reduxjs/toolkit';
import supplierReducer from '../features/supplier/supplierSlice'
import ingredientReducer from '../features/ingredient/ingredientSlice'
import cartReducer from '../features/cart/cartSlice'
import notificationReducer from '../features/notification/notificationSlice';

export const store = configureStore({
  reducer: {
    supplier: supplierReducer,
    ingredient: ingredientReducer,
    cart: cartReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ // to be removed in production
    immutableCheck: false
  }),
});
