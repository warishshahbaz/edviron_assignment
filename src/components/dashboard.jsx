import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import { MdDarkMode, MdLightMode } from "react-icons/md"; // Import dark and light mode icons
import axios from "axios";
import "tailwindcss/tailwind.css";
import { ToastContainer, toast } from "react-toastify";
import TableComp from "../components/tableCom";
import FilterComponent from "../components/filterComp";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ onLogout }) => {
  const [sequenceId, setSequenceId] = useState("");
  const [status, setStatus] = useState("");
  const [school, setSchool] = useState("");
  const [date, setDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [schoolData, setSchoolData] = useState([]);
  const [finalTableData, setFinalTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Set the number of rows per page
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/transactions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });
        const schoolres = await axios.get("/api/transactions/school", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });
        setSchoolData(schoolres?.data?.message);
        setTableData(response.data);
        setFilteredData(response.data); // Initial data for filters
        setTempData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let out = [];
    tableData.forEach((item) => {
      schoolData.forEach((schoolitem) => {
        if (item?._id === schoolitem?.school_id) {
          out.push({
            ...item,
            school_name: schoolitem?.school_name,
            school_id: schoolitem?.school_id,
            created_at: schoolitem?.createdAt,
          });
        }
      });
    });
    setFinalTableData(out ?? []);
    setFilteredData(out ?? []); // Updated filtered data
    setTempData(out ?? []);
  }, [tableData, schoolData]);

  const handleSequenceChange = (event) => {
    const valuedata = event.target.value;
    setSequenceId(valuedata);

    if (valuedata !== "") {
      // Filter tempData based on search value
      const res = tempData.filter((item) =>
        item.school_name?.toLowerCase().includes(valuedata?.toLowerCase())
      );
      setFilteredData(res);
    } else {
      // Reset to original data if search value is empty
      setFilteredData(tempData);
    }
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
    filterTable(value, school, date);
  };
  const handleSchoolChange = (event) => {
    const value = event.target.value;
    setSchool(value);
    filterTable(status, value, date);
  };
  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
    filterTable(status, school, value);
  };

  const filterTable = (status, school, date) => {
    const filtered = finalTableData.filter((row) => {
      const matchesStatus = status ? row.status === status : true;
      const matchesSchool = school ? row.school_name === school : true;
      const matchesDate = date
        ? row?.created_at?.split("T")[0] === date // Only match the date part
        : true;

      return matchesStatus && matchesSchool && matchesDate;
    });
    setFilteredData(filtered);
    setTempData(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleClick = async () => {
    try {
      const response = await axios.get("/api/transactions/import", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setTableData(response.data);
      toast("Data imported successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCopy = (collectId) => {
    navigator.clipboard.writeText(collectId);
    alert(`Copied: ${collectId}`);
  };

  // Extract unique school names dynamically
  const uniqueSchoolNames = [
    ...new Set(finalTableData.map((item) => item.school_name)),
  ];

  // Get current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } p-4`}
    >
      {/* Filter Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">History</h2>
        <div className="flex items-center space-x-4">
          <Button variant="outlined" onClick={handleClick}>
            Import
          </Button>
          <Button
            variant="outlined"
            onClick={handleLogout}
            color="secondary" // You can adjust the color as needed
          >
            Logout
          </Button>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? (
              <MdLightMode onClick={handleThemeToggle} />
            ) : (
              <MdDarkMode onClick={handleThemeToggle} />
            )}
          </IconButton>
        </div>
      </div>
      <FilterComponent
        sequenceId={sequenceId}
        handleSequenceChange={handleSequenceChange}
        status={status}
        handleStatusChange={handleStatusChange}
        school={school}
        handleSchoolChange={handleSchoolChange}
        uniqueSchoolNames={uniqueSchoolNames}
        date={date}
        handleDateChange={handleDateChange}
        isDarkMode={isDarkMode}
      />

      {/* Table Section */}
      <TableComp
        loading={loading}
        currentRows={currentRows}
        handleCopy={handleCopy}
        rowsPerPage={rowsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        filteredData={filteredData}
        isDarkMode={isDarkMode}
      />

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
