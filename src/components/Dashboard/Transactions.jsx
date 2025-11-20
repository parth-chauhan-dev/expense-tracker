import TransactionsList from "./TransactionsList";
import AddTransaction from "./AddTransaction";
import TransactionContextProvider from "../../store/transaction-context";

function Transactions() {
  return (
      <div className="transactions-section">
        <TransactionsList />
        <AddTransaction />
      </div>
  );
}

export default Transactions;
