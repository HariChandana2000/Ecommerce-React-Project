import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  totalOrderAmount: 0,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orderHistory = action.payload;
    },
    CALCULATE_TOTAL_ORDER_AMOUNT(state, action) {
      const array = [];
      state.orderHistory.map((item) => {
        const { orderAmount } = item;

        return array.push(orderAmount);
      });
      const totalAmount = array.reduce((acc, price) => acc + price, 0);

      state.totalOrderAmount = totalAmount;
    },
  },
});

export const { STORE_ORDERS, CALCULATE_TOTAL_ORDER_AMOUNT } =
  orderSlice.actions;

export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount;

export default orderSlice.reducer;
