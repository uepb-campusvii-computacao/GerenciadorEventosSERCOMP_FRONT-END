import React from "react";

export default function Pagination({
  usersPerPage,
  totalUsers,
  paginateFront,
  paginateBack,
  currentPage,
  paginateToggle,
}) {
  const total_pages = Math.ceil(totalUsers / usersPerPage);
  const pages = Array.from({ length: total_pages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col items-center justify-center py-3">
      <div>
        <p className="text-sm text-gray-400">
          Showing
          <span className="font-medium"> {currentPage * usersPerPage} </span>
          of
          <span className="font-medium"> {totalUsers} </span>
          results
        </p>
      </div>
      <nav className="block"></nav>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm gap-3"
          aria-label="Pagination"
        >
          <button
            onClick={() => {
              paginateBack();
            }}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Anterior</span>
          </button>
          <div className="flex items-center gap-2">
            {pages.map((page) => (
              <button
                className={`relative inline-flex items-center px-3 py-2 rounded border ${page == currentPage ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white'} leading-tight text-sm font-medium text-gray-500 hover:opacity-70`}
                onClick={() => paginateToggle(page)}
                key={page}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              paginateFront();
            }}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Próximo</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
