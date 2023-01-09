import { Autocomplete,TextField,createFilterOptions} from "@mui/material";
import { useState } from "react";
import {api_url,searchedSongs} from '../../private'
import './Search.css'
import { useEffect } from "react";
const filter = createFilterOptions();
const Search = () => {
   const [seachedData,setSearchedData] = useState([]);
   const [value, setValue] = useState(null);
   const handleChange = ()=>{
    fetch(`${api_url}/${searchedSongs}`).then((res)=>{
      res.json().then((data)=>{
        setSearchedData(data.songs);
      })
    })
   }

   useEffect(()=>{
    handleChange();
   })
  return (
    <Autocomplete
    className="scroll"
      value={value}
      size={'small'}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={seachedData}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: "100%",maxWidth:600}}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} placeholder='search songs...'/>
      )}
    />
  );
};
export default Search;