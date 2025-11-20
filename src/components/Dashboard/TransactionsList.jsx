import { useContext } from "react";
import TransactionItem from "./TransactionItem";
import { TransactionContext } from "../../store/transaction-context";

function TransactionsList() {
  const { transactions } = useContext(TransactionContext);
  return (
    <div className="transaction-list-section">
      <h4 className="transaction-list-title">Transactions</h4>
      <div className="transaction-list">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id || transaction.date}
              description={transaction.description}
              amount={transaction.amount}
            />
          ))}
      </div>
    </div>
  );
}

export default TransactionsList;
