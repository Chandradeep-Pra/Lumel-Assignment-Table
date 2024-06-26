import React from 'react';
import Row from './Row';

const Table = ({ rows }) => {

  // Update parent row's value based on child updates
  const updateParentValue = (parentId, newValue) => {

    // Creates a new array with updated values
    const updatedRows = rows.map(row => {
      if (row.id === parentId) {
        return { ...row, value: newValue };
      }
      return row;
    });
    console.log("Updated Rows: ", updatedRows);
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2">Label</th>
          <th className="border px-4 py-2">Value</th>
          <th className="border px-4 py-2">Input</th>
          <th className="border px-4 py-2">Allocation %</th>
          <th className="border px-4 py-2">Allocation Val</th>
          <th className="border px-4 py-2">Variance %</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <Row
            key={row.id}
            row={row}
            updateParent={updateParentValue}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
