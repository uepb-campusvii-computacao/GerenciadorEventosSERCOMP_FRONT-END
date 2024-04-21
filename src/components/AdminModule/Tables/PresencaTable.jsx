import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";

const PresencaTable = ({ data, atividadeId }) => {
  const [atividade, setAtividade] = useState({name: "Carregando...", responsaveis: "Sem Informação na Base de Dados"})

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const {data} = await axiosInstance.get(`/admin/atividades/${atividadeId}`)
        
        setAtividade(prev => { 
          return {...prev, name: data.nome}
        })
      }catch(error){
        toast.error("Erro ao pegar dados do servidor, tente novamente")
      }
    }

    fetchData();
  }, [atividadeId])

  const marcarPresenca = async (user_id) => {
    try{
      await axiosInstance.put(`/admin/atividades/${atividadeId}/inscricoes/${user_id}/frequencia`)
      toast.success("Presença registrada!")
    }catch(error){
      toast.error("Não foi possível executar a ação")
    }
  }

  const convertToCSV = () => {
    const csvHeader = "Nome,Email,Presença";

    const csvContent = data
      .map((item) => {
        return `${item.name},${item.email},${
          item.presenca ? "Presente" : "Ausente"
        }`;
      })
      .join("\n");

    const csv = `${csvHeader}\n${csvContent}`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "presenca.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col py-5">
        <span><strong className="text-yellow-500">Atividade: </strong>{atividade.name}</span>
        <span><strong className="text-yellow-500">Responsáveis: </strong>{atividade.responsaveis}</span>
      </div>
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-950">
            <tr>
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
                Presença
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
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked={item.presenca}
                    onClick={() => marcarPresenca(item.id)}
                  />
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

PresencaTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      presenca: PropTypes.bool.isRequired
    })
  ).isRequired,
  atividadeId: PropTypes.string.isRequired
};

export default PresencaTable;
