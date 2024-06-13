import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import "./BarChart.css";

export default function Barchart({ data }) {
  return (
    <div className="start">
      <h3 className="barhead">Top Expenses</h3>

      <div className="headbar">
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={100}
              tick={{ fill: "black" }}
            />
            <Bar
              dataKey="value"
              fill="#8884d8"
              style={{ borderRadius: "5px" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
