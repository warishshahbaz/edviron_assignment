import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { IoIosSearch } from "react-icons/io";

const FilterComponent = ({
  sequenceId,
  handleSequenceChange,
  status,
  handleStatusChange,
  school,
  handleSchoolChange,
  uniqueSchoolNames,
  date,
  handleDateChange,
  isDarkMode, // Theme state
}) => {
  return (
    <div
      className={`flex flex-wrap items-center justify-between mb-5 gap-4 p-4 rounded ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Sequence ID Search */}
      <TextField
        label="Search by school ID"
        variant="outlined"
        value={sequenceId}
        onChange={handleSequenceChange}
        sx={{
          width: "250px",
          ".MuiOutlinedInput-root": {
            backgroundColor: isDarkMode ? "#2D3748" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          },
          ".MuiInputLabel-root": {
            color: isDarkMode ? "#fff" : "#000",
          },
        }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                style={{ color: isDarkMode ? "#fff" : "#000" }}
              >
                <IoIosSearch />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Status Filter */}
      <FormControl
        sx={{
          width: "200px",
          ".MuiOutlinedInput-root": {
            backgroundColor: isDarkMode ? "#2D3748" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          },
          ".MuiInputLabel-root": {
            color: isDarkMode ? "#fff" : "#000",
          },
        }}
        size="small"
      >
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={handleStatusChange}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200,
                backgroundColor: isDarkMode ? "#2D3748" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
              },
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="SUCCESS">Success</MenuItem>
          <MenuItem value="FAILED">Failed</MenuItem>
          <MenuItem value="PENDING">Pending</MenuItem>
        </Select>
      </FormControl>

      {/* School Filter */}
      <FormControl
        sx={{
          width: "200px",
          ".MuiOutlinedInput-root": {
            backgroundColor: isDarkMode ? "#2D3748" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          },
          ".MuiInputLabel-root": {
            color: isDarkMode ? "#fff" : "#000",
          },
        }}
        size="small"
      >
        <InputLabel>School</InputLabel>
        <Select
          value={school}
          onChange={handleSchoolChange}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200,
                backgroundColor: isDarkMode ? "#2D3748" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
              },
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueSchoolNames.map((name, index) => (
            <MenuItem
              key={index}
              value={name}
              sx={{
                backgroundColor: isDarkMode ? "#2D3748" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#4A5568" : "#f0f0f0",
                },
              }}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Date Filter */}
      <TextField
        type="date"
        label="Date"
        variant="outlined"
        value={date}
        onChange={handleDateChange}
        sx={{
          width: "200px",
          ".MuiOutlinedInput-root": {
            backgroundColor: isDarkMode ? "#2D3748" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          },
          ".MuiInputLabel-root": {
            color: isDarkMode ? "#fff" : "#000",
          },
        }}
        InputLabelProps={{ shrink: true }}
        size="small"
      />
    </div>
  );
};

export default FilterComponent;
