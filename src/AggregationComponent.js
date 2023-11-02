import React, { useState, useEffect } from "react";

const AggregationComponent = () => {
  const [tag, setTag] = useState("signup");
  const [value, setValue] = useState("mm_dma");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(50);

  useEffect(() => {
    const url = value === "mm_dma" ? `http://localhost:8080/api/mm-dma-aggr?tag=${tag}&page=${page}&size=${size}` : `http://localhost:8080/api/site-aggr?tag=${tag}&page=${page}&size=${size}`;
    const username = 'user';
    const password = 'test';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
    fetch(url, { headers })
      .then(response => response.json())
      .then(data => {
        if (data && data.content) {
          setData(data.content.map(item => ({...item, mmDma: item.mmDma === "0" ? "N/A" : item.mmDma})));
        } else {
          console.error('Data is not an array');
        }
      });
  }, [tag, value, page, size]);

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
      <button onClick={() => setValue(value === "mm_dma" ? "siteId" : "mm_dma")}>{value}</button>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous Page</button>
      <button onClick={() => setPage(page + 1)}>Next Page</button>
      <table>
        <thead>
          <tr>
            <th>{value === "mm_dma" ? "MM-DMA" : "Site ID"}</th>
            <th>Views</th>
            <th>CTR</th>
            <th>EVPM</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? data.map((item, index) => (
            <tr key={index}>
              <td>{value === "mm_dma" ? item.mmDma : item.siteId}</td>
              <td>{item.views}</td>
              <td>{item.ctr}</td>
              <td>{item.evpm}</td>
              <td>{item.tag}</td>
            </tr>
          )) : <tr><td colSpan="5">No data available</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AggregationComponent;

