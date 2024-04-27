import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import paths from "../../../paths.js";
import Pagination from "../Pagination/Pagination.jsx";
import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

const InscritosTable = ({ data }) => {
  const [users, setUsers] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  const [usersPerPage] = useState(20);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  function searchUser(nome_user) {
    const filteredUsers = data.filter((user) =>
      user.name.toLowerCase().includes(nome_user.toLowerCase())
    );
    setUsers(filteredUsers);
  }

  // Change page
  const paginateFront = () => {
    if (indexOfLastUser < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginateBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginateToggle = (page_number) => {
    setCurrentPage(page_number);
  };

  const convertToCSV = () => {
    const csvHeader = "ID,Nome,Email,Status Pagamento,Credenciamento";

    const csvContent = data
      .map((item) => {
        return `${item.id},'${item.name}',${item.email},${item.paymentStatus},${
          item.credential ? "Sim" : "Não"
        }`;
      })
      .join("\n");

    const csv = `${csvHeader}\n${csvContent}`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center w-full my-4">
        <input
          onChange={(e) => searchUser(e.target.value)}
          className="rounded-md bg-white px-3 py-2 text-gray-600 w-full pl-12"
          placeholder="Pesquise pelo nome"
          type="text"
        />
        <MagnifyingGlass
          className="absolute left-3"
          color="#1d4ed8"
          size={24}
        />
      </div>
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-950">
            <tr>
              <th scope="col" className="hidden">
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Status Pagamento
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((item) => (
              <tr key={item.id}>
                <td className="hidden">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.paymentStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  <a
                    href={`${paths.participante}/editar/${item.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit className="w-12" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length > usersPerPage && (
        <div className="flex items-center w-full justify-center px-8 py-3">
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={users.length}
            paginateFront={paginateFront}
            paginateBack={paginateBack}
            currentPage={currentPage}
            paginateToggle={paginateToggle}
          />
        </div>
      )}
      <div className="flex flex-col items-end w-full mt-3 mb-3">
        <button
          onClick={convertToCSV}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Exportar CSV
        </button>
      </div>
    </div>
  );
};

InscritosTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      paymentStatus: PropTypes.string.isRequired,
      credential: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default InscritosTable;
