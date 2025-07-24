import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:4000/api/history";

function formatTimestamp(ts) {
  return new Date(ts).toLocaleString();
}

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await axios.get(API);
    setHistory(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchHistory();
  };

  const handleDeleteAll = async () => {
    await axios.delete(API);
    fetchHistory();
  };

  // For demo: Add a random URL to test
  const handleAdd = async () => {
    const url = "https://example.com/" + Math.floor(Math.random()*1000);
    await axios.post(API, { url });
    fetchHistory();
  }

  return (
    <div style={{ margin: "40px auto", maxWidth: "600px" }}>
      <h2>Browser History</h2>
      <button onClick={handleAdd}>Add Random History</button>
      <button onClick={handleDeleteAll} disabled={history.length === 0} style={{ marginLeft: 16 }}>
        Delete All
      </button>
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>URL</th>
            <th>Timestamp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: '1em' }}>No history entries found.</td>
            </tr>
          ) : (
            history.map((item, i) => (
              <tr key={item.id}>
                <td>{i+1}</td>
                <td>{item.url}</td>
                <td>{formatTimestamp(item.timestamp)}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
