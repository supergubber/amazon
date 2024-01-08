import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  userInfo: null,
}

export const amazonSlice = createSlice({
  name: 'amazon',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity += action.payload.quantity
      } else {
        state.products.push(action.payload)
      }
    },
    deleteProduct: (state, action) => {
      state.products.splice(action.payload, 1)
    },
    removeAll: (state) => {
      state.products = []
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload)

      item.quantity++
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload)
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--
      }
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    userSignOut: (state) => {
      state.userInfo = null
    },
    // addToCart(state, action) {
    //     state.products.push(action.payload)
    // },
  },
})

export const {
  addToCart,
  deleteProduct,
  removeAll,
  incrementQuantity,
  decrementQuantity,
  setUserInfo,
  userSignOut,
} = amazonSlice.actions
export default amazonSlice.reducer
