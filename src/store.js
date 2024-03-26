import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

/*
  - SECTION GOAL: is to model the bank account to be a bit simpler without an account number and onlu with a balance , ..
*/

// REDUCERS
/* 
  -the goal of reducer is to calculate the state based on the current state and the received action
  -reducers aren't allowed to modify the existing state and not allowed to do any asynchronous logic or other side effects
  -one big difference between this reducer and the reducer in useReducer hook: usually we directly pass initialState as the default value
*/

// REDUX TOOLKIT
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
