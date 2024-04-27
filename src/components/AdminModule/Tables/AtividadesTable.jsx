import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import paths from "../../../paths.js";

const AtividadesTable = ({ data }) => {
  const convertToCSV = () => {
    const csvHeader = "Atividade, Inscrições";
    console.log()
    console.log(data)

    const csvContent = data
      .map((item) => {
        return `'${item.name}', ${item.inscricoes || 0}`;
      })
      .join("\n");

    const csv = `${csvHeader}\n${csvContent}`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "inscricoes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-950">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Atividade
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Inscrições
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Lista de Presença
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.inscricoes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center flex items-center flex-col">
                  <a
                    href={`${paths.atividades}/${item.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaSearch className="w-12" />
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

AtividadesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      inscricoes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default AtividadesTable;
