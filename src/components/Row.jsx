import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';

const Row = ({ row, updateParent }) => {
  const { id, label, value, children } = row;
  const [currentValue, setCurrentValue] = useState(value);
  const [inputValue, setInputValue] = useState('');
  const [variancePercent, setVariancePercent] = useState(0);

  // Update currentValue when props change
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // Update parent row's value and variance on currentValue change
  useEffect(() => {
    if (updateParent) {
      updateParent(id, currentValue);
      calculateVariance(currentValue);
    }
  }, [currentValue, id, updateParent]);

  // Handle Allocation Percentage button click
  const handleAllocationPercentage = () => {
    if (!inputValue) return;
    const percentage = parseFloat(inputValue);
    if (!isNaN(percentage)) {
      const newValue = currentValue + (currentValue * percentage) / 100;
      setCurrentValue(newValue);
      setInputValue('');

      // Update parent with the new value
      updateParent(id, newValue); 

      calculateVariance(newValue);
    }
  };

  // Handle Allocation Value button click
  const handleAllocationValue = () => {
    if (!inputValue) return;
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue)) {
      setCurrentValue(newValue);
      setInputValue('');

      // Update parent with the new value
      updateParent(id, newValue); 
      
      calculateVariance(newValue);
    }
  };

  // Calculate variance based on original value
  const calculateVariance = (newValue) => {
    const originalValue = value;
    const variance = ((newValue - originalValue) / originalValue) * 100;
    setVariancePercent(variance.toFixed(2));
  };

  // Handle input change
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <>
      <tr>
        <td className={`border px-4 py-2 ${children ? 'font-bold' : ''}`}>{!children ? "--" + label : label}</td>
        <td className="border px-4 py-2">{currentValue}</td>
        <td className="border px-4 py-2">
          <Input onChange={handleInputChange} />
        </td>
        <td className="border px-4 py-2">
          <Button type="percentage" onClick={handleAllocationPercentage} />
        </td>
        <td className="border px-4 py-2">
          <Button type="value" onClick={handleAllocationValue} />
        </td>
        <td className="border px-4 py-2">{variancePercent}%</td>
      </tr>
      {children && children.map(child => (
        <Row
          key={child.id}
          row={child}
          updateParent={updateParent}
        />
      ))}
    </>
  );
}

export default Row;
