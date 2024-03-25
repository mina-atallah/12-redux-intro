import { applyMiddleware, combineReducers, createStore } from "redux";
// middleware (to manage asynchronous operations and side effects within your Redux-based applications.)
import { thunk } from "redux-thunk";
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

// REDUX
// COMINED REDUCER/ ROOT RODUCER
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
