import Balance from "./BalanceSummary";
import Transactions from "./Transactions";
import TransactionContextProvider from "../../store/transaction-context";

function Dashboard() {
  return (
    <TransactionContextProvider>
      <div className="dashboard">
        <h2 className="title">Expense Tracker</h2>
        <Balance />
        <Transactions />
      </div>
    </TransactionContextProvider>
  );
}

export default Dashboard;
