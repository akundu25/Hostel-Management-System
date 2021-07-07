import React from "react";

import "./Table.css";

const Table = ({ columns, content }) => {
  return (
    <table className="table-container">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content &&
          content.map((row, index) => (
            <tr key={index}>
              {columns.map((col, index) => (
                <td key={index}>{row[col]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
