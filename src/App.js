import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import data from "./employee.json";
import "./App.css";
import { Grid, Checkbox } from "@mui/material";
import practi from "./practitioners.json";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function App() {
  const [selectedOption, setSelectedOption] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [result, setResult] = useState("");

  const [searchText, setSearchText] = useState("");

  var allData = [...data, ...practi];
  // const containsText = (text, searchText) =>
  //   text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  


  const handleChange = (event) => {
    const value = event.target.value;

    // if (value[0] === "all") {
    //   setSelectedOption(
    //     selectedOption.length === allData.length ? [] : allData
    //   );

    if (value[value.length - 1] === "all") {
      setSelectedOption(
        selectedOption.length === allData.length ? [] : allData
      );

    
      return;
    }
    if (value[value.length - 1] === "all-practitioners") {
      setSelectedOption(selectedOption.length === practi.length ? [] : practi );
      return;
    
    }
    if (practi.find((p) => p.name === value[value.length - 1])) {
      setSelectedOption(value);
      console.log(typeof(value))
      allData.map((el)=>console.log(typeof(el.name)))


      return;
    }
    if (value[value.length - 1] === "all-assistant") {
      setSelectedOption(["all-assistant"]);
      return;
    }
    console.log("aa", value);
    setSelectedOption(value);
  };
  const displayedOptions = (searchText) => {
    let filterResult = allData.filter((option) =>
      option.name.toLowerCase().includes(searchText.toLowerCase())
        ? option.name
        : ""
    );
    setResult(filterResult);
    console.log(filterResult);
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    // searchText= e.target.value;
    if (e.target.value === "") {
      setSearchText("");
      setResult("");
    } else {
      setSearchText(e.target.value);
      displayedOptions(searchText);
    }
  };

  return (
    <div>
      <Grid container rowSpacing={1} columns={16}>
        <Grid item xs={8}>
          <h2>Select employee dropdown</h2>

          <div>
            <Select
              className="dropDown"
              MenuProps={{ autoFocus: false }}
              labelId="search-select-label"
              id="search-select"
              value={selectedOption}
              multiple
              onChange={handleChange}
              onClose={() => setSearchText("")}
              renderValue={(selec) => (
                <div style={{ display: "flex" }}>
                  <AvatarGroup style={{ marginTop: "8px" }} max={2}>
                    {selec.map((el) => (
                      <>
                        <Avatar key={el.id} alt={el.name} src={el.img} />
                      </>
                    ))}
                  </AvatarGroup>
                  <p style={{ color: "#314363" }}>
                    {selectedOption.length === allData.length
                      ? "All employees"
                      : ""}{" "}
                    {selectedOption.length === practi.length
                      ? " All practitioners"
                      : ""}
                  </p>
                </div>
              )}
            >
              {/* <div className="backGround"> */}

              <MenuItem>
                <TextField
                  // Autofocus on textfield
                  autoFocus
                  className="input"
                  placeholder="Search employee..."
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSearch(e)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      e.stopPropagation();
                    }
                  }}
                />
              </MenuItem>
              {result.length > 0
                ? result.map((el) => (
                    <MenuItem key={el.id} value={el.name}>
                      {result[0].name}
                    </MenuItem>
                  ))
                : ""}
              <MenuItem value="all">
                {
                  <AvatarGroup max={2}>
                    {allData.map((el) => (
                      <Avatar src={el.img} key={el.id} alt={el.name} />
                    ))}
                  </AvatarGroup>
                }
                <p className="empName">All employee</p>
                <Checkbox
                  style={{ position: "absolute", marginLeft: "308px" }}
                  checked={selectedOption.length === allData.length}

                  // indeterminate={
                  //   selectedOption.length > 0 &&
                  //   selectedOption.length < allData.length
                  // }
                />
              </MenuItem>
              <MenuItem value="all-practitioners">
                <p> All practitioners</p>
                <Checkbox
                  style={{ position: "absolute", marginLeft: "308px" }}
                  checked={
                    selectedOption.length === practi.length ||
                    selectedOption.length === allData.length
                  }
                  // indeterminate={
                  //   selectedOption.length > 0 &&
                  //   selectedOption.length < practi.length
                  // }
                />
              </MenuItem>

              {practi.map((el) => {
                return (
                  <MenuItem className="practi" key={el.id} value={el.name}>
                    <Avatar key={el.id} alt={el.name} src={el.img}/>
                    <p style={{ marginLeft: "16px" }}>{el.name}</p>
                    <Checkbox
                      style={{ position: "absolute", marginLeft: "308px" }}
                      checked={
                        selectedOption.length === practi.length ||
                        selectedOption.length === allData.length
                          ? selectedOption.length === practi.length ||
                            selectedOption.length === allData.length
                          : selectedOption[0] === el.name
                      }
                      // indeterminate={
                      //   selectedOption.length > 0 &&
                      //   selectedOption.length < practi.length
                      // }
                    />
                  </MenuItem>
                );
              })}
              <MenuItem value="all-assistant">
                <p> All assistants</p>
                <Checkbox
                  style={{ position: "absolute", marginLeft: "308px" }}
                  checked={selectedOption[0] === "all-assistant"}
                  // indeterminate={
                  //   selectedOption.length > 0 &&
                  //   selectedOption.length < practi.length
                  // }
                />
              </MenuItem>

              {/* </div> */}
            </Select>
          </div>
        </Grid>
        {/* Right  */}
        <div>
          <Grid item xs={8}>
            <h2>Date picker</h2>
            <div className="dropDown">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Pick date"
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}
