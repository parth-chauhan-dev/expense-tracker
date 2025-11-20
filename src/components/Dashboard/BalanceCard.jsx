function BalanceCard({ title, amount, style }) {
  return (
    <div className="balance-card" style={style}>
      <p className="balance-card-title">{title}</p>
      <p className="balance-card-amount">{amount}</p>
    </div>
  );
}

export default BalanceCard;
