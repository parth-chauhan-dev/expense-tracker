import React, { useContext } from "react";
import BalanceCard from "./BalanceCard";
import { useTransactions } from "../../hooks/useTransactions";
import { TransactionContext } from "../../store/transaction-context";

function BalanceSummary() {
  const { transactions } = useContext(TransactionContext);
  const totalBalance = transactions
    .map((transaction) => transaction.amount)
    .reduce((acc, curr) => acc + curr, 0);

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((a, t) => a + t.amount, 0);

  const formatAmount = (values) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(values);
  };

  return (
    <div className="balance-summary">
      <h5>Your Balance</h5>
      <h1>{formatAmount(totalBalance)}</h1>
      <div className="balance-cards">
        <BalanceCard
          title="Income"
          amount={formatAmount(income)}
          style={{ color: "green" }}
        />
        <BalanceCard
          title="Expenses"
          amount={formatAmount(-expense)}
          style={{ color: "red" }}
        />
      </div>
    </div>
  );
}

export default BalanceSummary;
