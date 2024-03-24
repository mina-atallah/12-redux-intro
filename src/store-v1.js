import { combineReducers, createStore } from "redux";

/*
  - PURE CODE (REDUX WITHOUT REACT), to understand REDUX in isolation.
  - then we integrate the two together!
  - SECTION GOAL: is to model the bank account to be a bit simpler without an account number and onlu with a balance , ..
*/
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// REDUCERS
/* 
  -the goal of reducer is to calculate the state based on the current state and the received action
  -reducers aren't allowed to modify the existing state and not allowed to do any asynchronous logic or other side effects
  -one big difference between this reducer and the reducer in useReducer hook: usually we directly pass initialState as the default value
*/
function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

// COMINED REDUCER/ ROOT RODUCER
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// REDUX
const store = createStore(rootReducer);
store.dispatch(updateName("M.M.Shendi"));
store.dispatch(deposit(500));
console.log(store.getState());

// ACTIONS
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

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
