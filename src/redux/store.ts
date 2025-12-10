import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

