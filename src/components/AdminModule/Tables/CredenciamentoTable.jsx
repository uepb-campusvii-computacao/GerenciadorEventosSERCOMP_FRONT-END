import PropTypes from "prop-types";
import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { BACKEND_DEFAULT_URL } from "../../../backendPaths.js";
import EventContext from "../../../context/Event/EventContext.jsx";
import paths from "../../../paths.js";
import axiosInstance from "./../../../axiosInstance.js";

const toggleCredenciamentoEndpoint = (id_evento, user_id) => {
  return `${BACKEND_DEFAULT_URL}/admin/events/${id_evento}/inscricoes/credenciamento/${user_id}`;
}

const CredenciamentoTable = ({ data }) => {
  const { events } = useContext(EventContext);

  const convertToCSV = () => {
    const csvHeader = "ID,Nome,Email,Status Pagamento,Credenciamento";

    const csvContent = data
      .map((item) => {
        return `${item.id},${item.name},${item.email},${item.paymentStatus},${
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

  const toggleCredential = async (user_id, { target }) =>{
    target.disabled = true
    try{
      await axiosInstance.put(toggleCredenciamentoEndpoint(events[0].uuid_evento, user_id))
      toast.success("Credenciamento Marcado")
    }catch (error) {
      target.checked = !target.checked
      console.error("Erro ao marcar credenciamento:", error);
      toast.error("Erro ao marcar credenciamento");
    }
    target.disabled = false
  }

  return (
    <div className="flex flex-col">
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
                Credenciamento
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
            {data.map((item) => (
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
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked={item.credential}
                    onClick={(ref) => toggleCredential(item.id, ref)}
                  />
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
