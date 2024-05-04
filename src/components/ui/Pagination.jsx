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
  const maxVisiblePages = 4; // Número máximo de botões de página visíveis

  let startPage = 1;
  let endPage = total_pages;

  if (total_pages > maxVisiblePages) {
    if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + Math.floor(maxVisiblePages / 2) >= total_pages) {
      startPage = total_pages - maxVisiblePages + 1;
      endPage = total_pages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="flex flex-col items-center justify-center py-3">
      <nav className="block"></nav>
      <div className="flex items-center justify-center">
        <button
          onClick={paginateBack}
          className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 mr-1"
        >
          Anterior
        </button>
        <div className="flex items-center gap-1">
          {startPage > 1 && (
            <spam
              className="relative inline-flex items-center p-2 rounded border border-gray-300 bg-white text-sm font-medium text-gray-500"
            >
              ...
            </spam>
          )}
          {pages.map((page) => (
            <button
              className={`relative inline-flex items-center px-3 py-2 rounded border ${
                page === currentPage
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white"
              } leading-tight text-sm font-medium text-gray-500 hover:opacity-70`}
              onClick={() => paginateToggle(page)}
              key={page}
            >
              {page}
            </button>
          ))}
          {endPage < total_pages && (
            <spam
              className="relative inline-flex items-center p-2 rounded border border-gray-300 bg-white text-sm font-medium text-gray-500"
            >
              ...
            </spam>
          )}
        </div>
        <button
          onClick={paginateFront}
          className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ml-1"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
