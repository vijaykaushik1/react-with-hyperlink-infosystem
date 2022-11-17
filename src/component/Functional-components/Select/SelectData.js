import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import Async, { useAsync } from 'react-select/async';
import SelectAsyncPaginate from './SelectAsyncPaginate';
import { AsyncPaginate } from "react-select-async-paginate";
const SelectData = () => {

  const options = [
    { value: "The Crownlands" },
    { value: "Iron Islands" },
    { value: "The North" },
    { value: "The Reach" },
    { value: "The Riverlands" },
    { value: "The Vale" },
    { value: "The Westerlands" },
    { value: "The Stormlands" }
  ];
  const [region, setRegion] = useState(options[0]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [regionName, setRegionName] = useState(null);
  useEffect(() => {
    console.log("region name on change");
    console.log(region.value)
    setRegionName(region.value);
  }, [region]);


  const onchangeSelect = (item) => {
    setCurrentCountry(null);
    setRegion(item);
  }; 

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    console.log("Searched string: ",searchQuery)
    const response = await fetch(
      `https://www.anapioficeandfire.com/api/houses?region=${regionName}&page=${page}&pageSize=10`
    );
    const responseJSON = await response.json();

    return {
      options: responseJSON,
      hasMore: responseJSON.length >= 1,
      additional: {
        page: searchQuery ? 2 : page + 1,
      },
    };
  };
  const onChange = () => {

  }
  return (
    <div className="App">
      <Select
        value={region}
        onChange={onchangeSelect}
        options={options}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.value}
      />
      <AsyncPaginate
        key={JSON.stringify(regionName)}
        value={regionName}
        loadOptions={loadOptions}
        getOptionValue={(option) => option.name}
        getOptionLabel={(option) => option.name}
        onChange={onChange}
        defaultOptions
        isSearchable={true}
        placeholder="Select House"
        additional={{
          page: 1,
        }}
      />
      
    </div>
  )
}

export default SelectData