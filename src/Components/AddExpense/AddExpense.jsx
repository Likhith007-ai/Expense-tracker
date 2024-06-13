import React, { useState } from "react";
import "./AddExpense.css";
import { useSnackbar } from "notistack";
function AddExpense({
  balance,
  setbalance,
  expenseopen,
  setexpenseopen,
  formData,
  setformData,
  editid,
}) {
  const [title, settitle] = useState();
  const [price, setprice] = useState();
  const [category, setcategory] = useState();
  const [date, setdate] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(price) > balance) {
      enqueueSnackbar("price shold not exceed wallet money", {
        variant: "warning",
      });
      setexpenseopen(false);
    }
    setbalance((prev) => prev - Number(price));

    const newExpense = {
      title: title,
      price: Number(price),
      category: category,
      date: date,
    };
    const id = formData.length + 1;
    const newdata = {
      ...newExpense,
      id: id,
    };
    setformData((prev) => [...prev, newdata]);

    setexpenseopen(false);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const newExpense = {
      title: title,
      price: Number(price),
      category: category,
      date: date,
    };
    console.log(formData);

    const updated = formData.map((value) => {
      if (value.id === editid) {
        const priceDiff = value.price - newExpense.price;
        setbalance((prev) => prev + priceDiff);
        return {
          ...value,
          title: newExpense.title,
          price: newExpense.price,
          category: newExpense.category,
          date: newExpense.date,
        };
      }
      return value;
    });

    setformData(updated);
    setexpenseopen(false);
  };

  const handlecancel = (e) => {
    e.preventDefault();
    setexpenseopen(false);
  };
  return (
    <div className="exp1">
      <h3 className="Main-header">{editid ? "EditExpenses" : "AddExpense"}</h3>
      <form
        className="Add-Expense"
        onSubmit={editid ? (e) => handleEdit(e) : (e) => handleSubmit(e)}
      >
        <div className="inner">
          <input
            className="inputs"
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={(e) => settitle(e.target.value)}
            required
          />
          <input
            className="inputs"
            type="number"
            name="price"
            value={price}
            placeholder="Price"
            onChange={(e) => setprice(e.target.value)}
            required
          />
        </div>
        <div className="inner">
          {" "}
          <select
            className="inputs"
            value={category}
            name="category"
            placeholder="select category"
            onChange={(e) => setcategory(e.target.value)}
            required
          >
            <option>Select Category</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
          </select>
          <input
            className="inputs"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            required
          />
        </div>
        <div className="inner">
          <button className="button3" type="submit">
            AddExpense
          </button>
          <button className="button4" onClick={(e) => handlecancel(e)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
