import React, { useState, useEffect } from "react";
import "./RecentTransaction.css";
import { PiPizzaLight } from "react-icons/pi";
import { PiGiftThin } from "react-icons/pi";
import { CiRollingSuitcase } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { BsPencil } from "react-icons/bs";
import Pagination from "../Pagination/Pagination";
import AddExpense from "../AddExpense/AddExpense";
import ReModals2 from "../Modals/AddExpenseModal";

function RecentTransaction({ formData, setformData, balance, setbalance }) {
  const [expenseopen, setexpenseopen] = useState(false);
  const [editid, seteditid] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  const [totalpage, settotalpage] = useState(0);
  const [recentdata, setrecentdata] = useState([]);

  const captalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  const formatdate = (date) => {
    const option = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, option);
  };
  const handleDelete = (id) => {
    const value = formData.find((Id) => Id.id === id);
    setbalance((prev) => prev + value.price);

    const afterfilter = formData.filter((Id) => Id.id !== id);
    setformData(afterfilter);
    return formData;
  };

  const handleEdit = (id) => {
    setexpenseopen(true);
    seteditid(id);
  };
  useEffect(() => {
    const maximum = 3;
    let startIdx = (currentpage - 1) * maximum;
    let endIdx = Math.min(currentpage * maximum, formData.length);
    let correctData = formData.slice(startIdx, endIdx);
    let pages = Math.ceil(formData.length / 3);
    settotalpage(pages);
    setrecentdata(correctData);
  }, [formData, currentpage]);
  useEffect(() => {
    if (totalpage < currentpage && currentpage > 1) {
      setcurrentpage((prev) => prev - 1);
    }
  }, [totalpage, currentpage]);

  return (
    <div className="recent">
      <h4 className="Recenthead">Recent Transaction</h4>
      {recentdata.length !== 0 ? (
        <div className="mainpart">
          {recentdata.map((data, index) => (
            <div key={index} className="innerpart">
              <div className="Divfirst">
                {data.category === "Food" && (
                  <PiPizzaLight
                    style={{
                      background: "#D9D9D9",
                      border: "1px solid #D9D9D9",
                      borderRadius: "50px",
                      padding: "5px",
                    }}
                  />
                )}
                {data.category === "Entertainment" && (
                  <PiGiftThin
                    style={{
                      background: "#D9D9D9",
                      border: "1px solid #D9D9D9",
                      borderRadius: "50px",
                      padding: "5px",
                    }}
                  />
                )}
                {data.category === "Travel" && (
                  <CiRollingSuitcase
                    style={{
                      background: "#D9D9D9",
                      border: "1px solid #D9D9D9",
                      borderRadius: "50px",
                      padding: "5px",
                    }}
                  />
                )}
                <div style={{ marginLeft: "20px" }}>
                  <div
                    style={{
                      color: "#000000",
                      fontFamily: "Open Sans",
                      fontSize: "16px",
                      fontWeight: "400px",
                    }}
                  >
                    {captalize(data.title)}
                  </div>
                  <div
                    style={{
                      color: "#9B9B9B",
                      fontFamily: "Open Sans",
                      fontSize: "16px",
                      fontWeight: "400px",
                    }}
                  >
                    {formatdate(data.date)}
                  </div>
                </div>
              </div>
              <div className="Divsecond">
                <div className="price"> ₹{data.price}</div>
                <div className="edit">
                  <ImCancelCircle
                    style={{
                      border: "1px solid #FF3E3E",
                      borderRadius: "15px",
                      padding: "10px",
                      background: "#FF3E3E",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(data.id)}
                  />
                  <BsPencil
                    style={{
                      border: "1px solid #F4BB4A",
                      borderRadius: "15px",
                      padding: "10px",
                      background: "#F4BB4A",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(data.id)}
                  />
                </div>
              </div>
            </div>
          ))}
          {totalpage > 1 && (
            <Pagination
              currentpage={currentpage}
              totalpage={totalpage}
              setcurrentpage={setcurrentpage}
            />
          )}
        </div>
      ) : (
        <div className="noTransaction">No Transaction</div>
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
            editid={editid}
          />
        </ReModals2>
      )}
    </div>
  );
}

export default RecentTransaction;
