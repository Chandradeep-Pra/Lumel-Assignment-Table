import React from 'react';
import Table from './components/Table';
import tableData from './data/tableData.json'; 

function App() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center ">
      <h1 className="text-2xl font-bold mb-4 underline">Hierarchical Table</h1>
      <Table rows={tableData.rows} />
    </div>
  );
}

export default App;
