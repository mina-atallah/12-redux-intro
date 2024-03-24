import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

/*
  - PURE CODE (REDUX WITHOUT REACT), to understand REDUX in isolation.
  - then we integrate the two together!
  - SECTION GOAL: is to model the bank account to be a bit simpler without an account number and onlu with a balance , ..
*/

// REDUCERS
/* 
  -the goal of reducer is to calculate the state based on the current state and the received action
  -reducers aren't allowed to modify the existing state and not allowed to do any asynchronous logic or other side effects
  -one big difference between this reducer and the reducer in useReducer hook: usually we directly pass initialState as the default value
*/

// REDUX
// COMINED REDUCER/ ROOT RODUCER
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
