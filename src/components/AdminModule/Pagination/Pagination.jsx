import React from "react";

export default function Pagination({
  usersPerPage,
  totalUsers,
  paginateFront,
  paginateBack,
  currentPage,
}) {
  return (
    <div className="py-2">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium">{currentPage * usersPerPage - 10}</span>
          to
          <span className="font-medium"> {currentPage * usersPerPage} </span>
          of
          <span className="font-medium"> {totalUsers} </span>
          results
        </p>
      </div>
      <nav className="block"></nav>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => {
              paginateBack();
            }}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Previous</span>
          </button>
          <div className="flex items-center gap-2">
            <span >1</span>
            <span >2</span>
            <span >3</span>
            <span >4</span>
            <span >5</span>
          </div>
          <button
            onClick={() => {
              paginateFront();
            }}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
