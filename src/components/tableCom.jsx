import { CircularProgress, IconButton, Pagination } from "@mui/material";
import React from "react";
import { MdContentCopy } from "react-icons/md";

const TableComp = ({
  loading,
  currentRows,
  filteredData,
  rowsPerPage,
  paginate,
  handleCopy,
  currentPage,
  isDarkMode, // Dark mode state
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (currentRows?.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px]">No Data</div>
    );
  }

  return (
    <div
      className={`overflow-x-auto rounded-lg shadow ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <table
        className={`table-auto w-full text-left border-collapse border ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <thead
          className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"} text-sm`}
        >
          <tr>
            <th className="px-4 py-2 border">School Name</th>
            <th className="px-4 py-2 border">Collect ID</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Custom Order</th>
            <th className="px-4 py-2 border">Payment Method</th>
            <th className="px-4 py-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? isDarkMode
                    ? "bg-gray-700"
                    : "bg-gray-50"
                  : "bg-white"
              } ${
                index % 1 === 0
                  ? isDarkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-50"
                  : "hover:bg-white"
              } hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out`}
            >
              <td className="px-4 py-2 border capitalize">{row.school_name}</td>
              <td className="px-4 py-2 border flex items-center">
                {row.collect_id}
                <IconButton
                  size="small"
                  onClick={() => handleCopy(row.collect_id)}
                  className="ml-2"
                >
                  <MdContentCopy />
                </IconButton>
              </td>
              <td
                className={`px-4 py-2 border ${
                  row.status === "SUCCESS"
                    ? "text-green-500"
                    : row.status === "PENDING"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {row.status}
              </td>
              <td className="px-4 py-2 border">{row.custom_order_id}</td>
              <td className="px-4 py-2 border">{row.gateway}</td>
              <td className="px-4 py-2 border">
                {row.created_at ? row.created_at.split("T")[0] : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center py-4">
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={currentPage}
          onChange={paginate}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: isDarkMode ? "#fff" : "#000",
            },
            "& .MuiPaginationItem-ellipsis": {
              color: isDarkMode ? "#fff" : "#000",
            },
          }}
        />
      </div>
    </div>
  );
};

export default TableComp;
