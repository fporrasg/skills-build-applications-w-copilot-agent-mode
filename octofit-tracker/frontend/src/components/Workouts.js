import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const endpoint =
      `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts endpoint:', endpoint);

    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Workouts response:', json);
        if (json && Array.isArray(json)) {
          setItems(json);
        } else if (json && json.results) {
          setItems(json.results);
        } else {
          setItems([]);
        }
      })
      .catch((err) => console.error('Workouts fetch error:', err));
  }, [reload]);

  const renderTable = () => {
    if (items.length === 0) {
      return <p>No workouts available.</p>;
    }
    const headers =
      items[0] && typeof items[0] === 'object' ? Object.keys(items[0]) : [];
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              {headers.map((h) => (
                <td key={h}>{String(item[h])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Workouts</h2>
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setReload((r) => r + 1)}
        >
          Refresh
        </button>
        {renderTable()}
      </div>
    </div>
  );
};

export default Workouts;
