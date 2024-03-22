import { createStore } from "redux";

/*
  - PURE CODE (REDUX WITHOUT REACT), to understand REDUX in isolation.
  - then we integrate the two together!
  - SECTION GOAL: is to model the bank account to be a bit simpler without an account number and onlu with a balance , ..
*/
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
/* 
  -the goal of reducer is to calculate the state based on the current state and the received action
  -reducers aren't allowed to modify the existing state and not allowed to do any asynchronous logic or other side effects
  -one big difference between this reducer and the reducer in useReducer hook: usually we directly pass initialState as the default value
*/
function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;
      // rest of this state is later (purpose of loan)
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

// REDUX
const store = createStore(reducer);
// store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch(deposit(300));
store.dispatch(withdraw(120));
store.dispatch(requestLoan(5000, "Buying a laptop"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}
