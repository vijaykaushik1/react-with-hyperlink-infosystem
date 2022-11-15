import React, { useState } from 'react'
import Select from 'react-select';
import Async, { useAsync } from 'react-select/async';

const SelectData = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="App">
    <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
    />
  </div>
  )
}

export default SelectData