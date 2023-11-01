import React, { useState, useEffect } from "react";

const AggregationComponent = () => {
  const [tag, setTag] = useState("misc");
  const [value, setValue] = useState("mm_dma");
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = value === "mm_dma" ? `http://localhost:8080/api/mm-dma-aggr?tag=${tag}` : `http://localhost:8080/api/site-aggr?tag=${tag}`;
    const username = 'user';
    const password = 'test';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
    fetch(url, { headers })
      .then(response => response.json())
      .then(data => setData(data));
  }, [tag, value]);

  return (
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
      <button onClick={() => setValue(value === "mm_dma" ? "ctr" : "mm_dma")}>{value}</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Updated</th>
            <th>Views</th>
            <th>CTR</th>
            <th>EVPM</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.updated}</td>
              <td>{item.views}</td>
              <td>{item.ctr}</td>
              <td>{item.evpm}</td>
              <td>{item.tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AggregationComponent;
