import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [snacks, setSnacks] = useState("");
  const [total, setTotal] = useState(null);
  const [remaining, setRemaining] = useState(null);

  const handleCalculate = () => {
    if (!name || !goal || !breakfast || !lunch || !dinner || !snacks) {
      alert("Please fill all fields!");
      return;
    }

    const values = [goal, breakfast, lunch, dinner, snacks].map(Number);
    if (values.some((val) => val <= 0 || isNaN(val))) {
      alert("Please enter positive numbers only!");
      return;
    }

    const totalCalories = values.slice(1).reduce((a, b) => a + b, 0);
    const remainingCalories = values[0] - totalCalories;

    setTotal(totalCalories);
    setRemaining(remainingCalories);
  };

  return (
    <div className="app-container">
      <h1>🥗 Calorie Tracker</h1>

      <div className="form-container">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Daily Calorie Goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
        <input type="number" placeholder="Breakfast Calories" value={breakfast} onChange={(e) => setBreakfast(e.target.value)} />
        <input type="number" placeholder="Lunch Calories" value={lunch} onChange={(e) => setLunch(e.target.value)} />
        <input type="number" placeholder="Dinner Calories" value={dinner} onChange={(e) => setDinner(e.target.value)} />
        <input type="number" placeholder="Snacks Calories" value={snacks} onChange={(e) => setSnacks(e.target.value)} />

        <button onClick={handleCalculate}>Calculate Calories</button>
      </div>

      {total !== null && (
        <div className="results">
          <h2>Results</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Goal:</strong> {goal}</p>
          <p><strong>Total Consumed:</strong> {total}</p>
          <p
            style={{
              color: remaining < 0 ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            Remaining: {remaining} <br />
            {remaining < 0 ? "⚠️ You exceeded your daily goal!" : "✅ You are within your goal!"}
          </p>
        </div>
      )}
    </div>
  );
}
