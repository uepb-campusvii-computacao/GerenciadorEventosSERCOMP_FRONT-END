import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import PresencaTable from "../../../components/AdminModule/Tables/PresencaTable";
import Title from "../../../components/Title/Title";

const AdminPresencaAtividade = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async (activityId) => {
    try {
      const response = await axiosInstance.get(`/admin/atividades/${activityId}/inscricoes`);

      const mappedData = response.data.map((inscrito) => ({
        id: inscrito.uuid_user,
        name: inscrito.nome,
        email: inscrito.email,
        presenca: inscrito.presenca,
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Erro ao buscar dados de inscritos:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <>
      <Title title="Registrar Presença" />
      <PresencaTable data={data} atividadeId={id} />
    </>
  );
};

export default AdminPresencaAtividade;

