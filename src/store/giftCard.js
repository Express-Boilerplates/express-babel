import { createSlice } from "@reduxjs/toolkit";

const giftCardSlice = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
    addGiftCard: (state, { payload }) => {
      state.push(payload);
    },
    loadGiftCards: (state, { payload }) => (state = payload),
    deleteGiftCard: (state, { payload }) => {
      state.splice(
        state.findIndex(emp => emp.id === payload.id),
        1
      );
    }
  }
});

export const {
  addGiftCard,
  loadGiftCards,
  deleteGiftCard
} = giftCardSlice.actions;

export default giftCardSlice;
