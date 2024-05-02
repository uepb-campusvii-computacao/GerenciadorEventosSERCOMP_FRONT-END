import AtividadesTable from "../../../components/AdminModule/Tables/AtividadesTable";
import Title from "../../../components/Title/Title";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import EventContext from "../../../context/Event/EventContext";
import Loading from "../../Loading/Loading";

const getAtividadesDataEndpoint = (event_id) => {
  return `/admin/events/${event_id}/atividades`;
};

const AdminAtividades = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { events } = useContext(EventContext);
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const { data } = await axiosInstance.get(getAtividadesDataEndpoint(events[0].uuid_evento))

        const mappedResponse = data.map(p => {
          return {
            id: p.uuid_atividade,
            name: p.nome,
            inscricoes: p._count.userAtividade,
            presenca: false,
            tipo_atividade: p.tipo_atividade
          }
        })

        setTableData(mappedResponse);
      }catch (error) {
        console.error("Erro ao buscar inscritos:", error);
        toast.error("Erro ao buscar inscritos.");
      }
      setIsLoading(false);
    }

    fetchData();
  }, [events])

  return (
    <>
      {
        isLoading ? (
          <Loading />
        ) : (
          <>
            <Title title="Atividades"/>
            <AtividadesTable data={tableData} />
          </>
        )
      }
    </>
  );
};

export default AdminAtividades;
