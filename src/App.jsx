import { useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { useTransactions } from "./hooks/useTransactions";

function App() {
  const { isDbConnecting } = useTransactions();

  return <Dashboard />;
}

export default App;
