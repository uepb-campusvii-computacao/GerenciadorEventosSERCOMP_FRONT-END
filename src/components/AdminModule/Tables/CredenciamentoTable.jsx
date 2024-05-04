import { MagnifyingGlass } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { BACKEND_DEFAULT_URL } from "../../../backendPaths.js";
import EventContext from "../../../context/Event/EventContext.jsx";
import Pagination from "../../ui/Pagination.jsx";
import axiosInstance from "./../../../axiosInstance.js";

const toggleCredenciamentoEndpoint = (id_evento, user_id) => {
  return `${BACKEND_DEFAULT_URL}/admin/events/${id_evento}/inscricoes/credenciamento/${user_id}`;
};

const CredenciamentoTable = ({ data }) => {
  const { events } = useContext(EventContext);

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

  const convertToXLSX = () => {
    const excelData = data.map((item) => ({
      ID: item.id,
      Nome: item.name,
      "Nome no crachá": item.nome_cracha,
      Email: item.email,
      Credenciamento: item.credential ? "Sim" : "Não",
    }));

    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet['!cols'] = [
      { wch: 40 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
      { wch: 20 },
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    });
  
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Credenciamento.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleCredential = async (user_id, { target }) => {
    target.disabled = true;
    try {
      await axiosInstance.put(
        toggleCredenciamentoEndpoint(events[0].uuid_evento, user_id)
      );
      toast.success("Credenciamento Marcado");
    } catch (error) {
      target.checked = !target.checked;
      console.error("Erro ao marcar credenciamento:", error);
      toast.error("Erro ao marcar credenciamento");
    }
    target.disabled = false;
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
                Nome no crachá
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
                Credenciamento
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers
              .map((item) => (
                <tr key={item.id}>
                  <td className="hidden">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                    {item.nome_cracha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked={item.credential}
                      onClick={(ref) => toggleCredential(item.id, ref)}
                    />
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
          onClick={convertToXLSX}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Exportar XLSX
        </button>
      </div>
    </div>
  );
};

CredenciamentoTable.propTypes = {
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

export default CredenciamentoTable;
