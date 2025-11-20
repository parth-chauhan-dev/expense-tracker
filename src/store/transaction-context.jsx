import { createContext, useReducer, useEffect } from "react";
import { useTransactions } from "../hooks/useTransactions";

export const TransactionContext = createContext({
  transactions: [],
  addTransaction: () => {},
});

function transactionReducer(state, action) {
  if (action.type === "ADD_TRANSACTION") {
    const newTransaction = action.payload;
    const updatedTransactions = [...state.transactions, newTransaction];

    return {
      ...state,
      transactions: updatedTransactions,
    };
  }

  if (action.type === "SET_TRANSACTIONS") {
    return {
      ...state,
      transactions: action.payload,
    };
  }

  return state;
}

export default function TransactionContextProvider({ children }) {
  const {
    isDbConnecting,
    addTransaction: saveToDb,
    getTransactions,
  } = useTransactions();

  const [transactionState, transactionStateDispatch] = useReducer(
    transactionReducer,
    {
      transactions: [],
    }
  );

  useEffect(() => {
    async function loadTransactions() {
      if (!isDbConnecting) {
        const existingTransactions = await getTransactions();
        transactionStateDispatch({
          type: "SET_TRANSACTIONS",
          payload: existingTransactions,
        });
      }
    }

    loadTransactions();
  }, [isDbConnecting]);

  function handleAddTransaction(values) {
    const newTransaction = {
      description: values.description,
      amount: Number(values.amount),
      date: new Date(),
    };

    if (!isDbConnecting) {
      saveToDb(newTransaction);
    }

    transactionStateDispatch({
      type: "ADD_TRANSACTION",
      payload: newTransaction,
    });
  }

  const ctxValue = {
    transactions: transactionState.transactions,
    addTransaction: handleAddTransaction,
  };

  return (
    <TransactionContext.Provider value={ctxValue}>
      {children}
    </TransactionContext.Provider>
  );
}
