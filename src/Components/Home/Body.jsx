import React, { useEffect, useState } from "react";
import "./Body.css";
import Piechart from "../PieChart/PieChart";
import ReModals from "../Modals/AddIncomeModal";
import AddWallet from "../AddWallet/AddWallet";
import AddExpense from "../AddExpense/AddExpense";
import ReModals2 from "../Modals/AddExpenseModal";
import RecentTransaction from "../RecentTransaction/RecentTransaction";
import Barchart from "../BartChart/BarChart";
// import Barchart from "../BarChart/BarChart";

function Body() {
  const [walletopen, setwalletopen] = useState(false); // Wallet modal state
  const [expenseopen, setexpenseopen] = useState(false); // Expense modal state
  const [balance, setbalance] = useState(
    // Initial balance (adjust as needed)
    localStorage.getItem("balance")
      ? parseInt(localStorage.getItem("balance"))
      : 5000
  ); // Check local storage, set default if not found
  const [expense, setexpense] = useState(0); // Total expense
  const [formData, setformData] = useState(
    // Initial data (adjust as needed)
    localStorage.getItem("expenseList")
      ? JSON.parse(localStorage.getItem("expenseList"))
      : []
  ); // Check local storage, set empty array if not found
  const [foodspend, setfoodspend] = useState(0);
  const [entspend, setentspend] = useState(0);
  const [traspend, settraspend] = useState(0);

  // Functions to handle modal opening
  const handleWalletOpen = () => {
    setwalletopen(true);
  };
  const handleExpenseOpen = () => {
    setexpenseopen(true);
  };

  // Persist data in local storage (balance and expense list)
  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("expenseList", JSON.stringify(formData));
  }, [balance, formData]); // Update on balance or data change

  // Calculate expenses and category spending (replace with your logic)
  useEffect(() => {
    const expval = formData.reduce((tot, val) => val.price + tot, 0);
    setexpense(expval);

    let foodprice = 0;
    let entertainmentprice = 0;
    let travelprice = 0;

    formData.forEach((val) => {
      if (val.category === "Food") {
        foodprice = foodprice + val.price;
      } else if (val.category === "Entertainment") {
        entertainmentprice = entertainmentprice + val.price;
      } else {
        travelprice = travelprice + val.price;
      }
    });

    setfoodspend(foodprice);
    setentspend(entertainmentprice);
    settraspend(travelprice);
  }, [formData]);

  const pieChartData = [
    { name: "Food", value: foodspend, category: "food" },
    { name: "Entertainment", value: entspend, category: "entertainment" },
    { name: "Travel", value: traspend, category: "travel" },
  ];
  console.log("Piechart data:", pieChartData);

  return (
    <div
      style={{
        background: "#3B3B3B",
        borderRadius: "5px",
        margin: "15px",
        paddingTop: "35px",
      }}
    >
      <div className="part1">
        <h3>Expense Tracker</h3>
        <div className="first">
          <div className="wallet">
            <h4>
              Wallet Balance:{" "}
              <span style={{ color: "#9DFF5B", fontWeight: "bold" }}>
                ₹{balance}
              </span>
            </h4>
            <button className="button1" onClick={() => handleWalletOpen()}>
              + Add Income
            </button>
          </div>
          <div className="wallet">
            <h4>
              Expenses:{" "}
              <span style={{ color: "#FF9304", fontWeight: "bold" }}>
                ₹{expense}
              </span>
            </h4>
            <button
              className="button2"
              onClick={(e) => handleExpenseOpen()}
              style={{}}
            >
              + Add Expense
            </button>
          </div>
          <div>
            <Piechart
              data={[
                { name: "Food", value: foodspend, category: "food" },
                {
                  name: "Entertainment",
                  value: entspend,
                  category: "entertainment",
                },
                { name: "Travel", value: traspend, category: "travel" },
              ]}
            />
          </div>
        </div>
      </div>

      {walletopen && (
        <ReModals walletopen={walletopen} setwalletopen={setwalletopen}>
          <AddWallet
            balance={balance}
            setbalance={setbalance}
            setwalletopen={setwalletopen}
          />
        </ReModals>
      )}
      {expenseopen && (
        <ReModals2 expenseopen={expenseopen} setexpenseopen={setexpenseopen}>
          {" "}
          <AddExpense
            balance={balance}
            setbalance={setbalance}
            expenseopen={expenseopen}
            setexpenseopen={setexpenseopen}
            formData={formData}
            setformData={setformData}
          />
        </ReModals2>
      )}

      <div className="Bottom">
        <RecentTransaction
          formData={formData}
          setformData={setformData}
          balance={balance}
          setbalance={setbalance}
        />
        <Barchart
          data={[
            { name: "Food", value: foodspend },
            { name: "Entertainment", value: entspend },
            { name: "Travel", value: traspend },
          ]}
        />
      </div>
    </div>
  );
}

export default Body;
