import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderAll: [

    ],
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1

        addOrder: (state, action) => {

            state.orderAll = [action.payload, ...state.orderAll]

        },
        deleteOrder: (state, action) => {
            state.orderAll = state.orderAll.filter(e => e.id !== action.payload)
        },
        editStatus: (state, action) => {
            const index = state.orderAll.findIndex(i => i.id === action.payload)
            state.orderAll[index].status = 0
        },
        // backStatus: (state, action) => {
        //     const index = state.orderAll.findIndex(i => i.id === action.payload)
        //     state.orderAll[index].status = 1
        // }
    },
})

// Action creators are generated for each case reducer function
export const { editStatus, deleteOrder, addOrder, backStatus } = orderSlice.actions

export default orderSlice.reducer