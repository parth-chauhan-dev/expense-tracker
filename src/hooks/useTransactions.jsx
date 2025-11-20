import { useIndexedDb } from "./useIndexedDb";

export const useTransactions = () => {
  const { isDbConnecting, getAllValue, putValue } = useIndexedDb(
    "expense_tracker",
    ["transactions"]
  );

  const addTransaction = (txn) => {
    return putValue("transactions", txn);
  };

  const getTransactions = async () => {
    return await getAllValue("transactions");
  };

  const filterByDate = async (date) => {
    const all = await getAllValue("transactions");
    return all.filter((txn) => {
      const txnDate = new Date(txn.date);
      return txnDate.toDateString() === new Date(date).toDateString();
    });
  };

  return {
    isDbConnecting,
    addTransaction,
    getTransactions,
    filterByDate,
  };
};
