import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [resolution, setResolution] = useState("DAY");
  const [tag, setTag] = useState("registration");
  const [metric, setMetric] = useState("ctr");

  useEffect(() => { 
    fetchData();
  }, [resolution, tag, metric]);

  const fetchData = async () => {
    const username = 'user';
    const password = 'test';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
  
    const apiUrl = `http://localhost:8080/api/chart?resolution=${resolution.toLowerCase()}&tag=${tag}&metric=${metric}`;
  
    try {
      const response = await fetch(apiUrl, { headers });
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Chart Visualization</h2>
      <div>
        <label>Resolution:</label>
        <select onChange={(e) => setResolution(e.target.value)} value={resolution}>
          <option value="HOUR">HOUR</option>
          <option value="DAY">DAY</option>
          <option value="WEEK">WEEK</option>
          <option value="MONTH">MONTH</option>
        </select>
      </div>
      <div>
        <label>Tag:</label>
        <select onChange={(e) => setTag(e.target.value)} value={tag}>
          <option value="misc">misc</option>
          <option value="fclick">fclick</option>
          <option value="lead">lead</option>
          <option value="signup">signup</option>
          <option value="content">content</option>
          <option value="registration">registration</option>
        </select>
      </div>
      <div>
        <label>Metric:</label>
        <button onClick={() => setMetric(metric === "ctr" ? "evpm" : "ctr")}>{metric}</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={metric} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;

