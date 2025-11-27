function TransactionItem({ description, amount }) {
  const style = {
    boxShadow: `4px 0px 0px ${amount < 0 ? "red" : "green"}`,
  };

  return (
    <li className="transaction-item" style={style}>
      <div>{description}</div>
      <div>{amount < 0 ? `-₹${Math.abs(amount)}` : `₹${amount}`}</div>
    </li>
  );
}

export default TransactionItem;
