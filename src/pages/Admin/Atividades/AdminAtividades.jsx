import AtividadesTable from "../../../components/AdminModule/Tables/AtividadesTable";
import Title from "../../../components/Title/Title";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import EventContext from "../../../context/Event/EventContext";

const getAtividadesDataEndpoint = (event_id) => {
  return `/admin/events/${event_id}/atividades`;
};

const AdminAtividades = () => {
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
          }
        })

        setTableData(mappedResponse);
      }catch (error) {
        console.error("Erro ao buscar inscritos:", error);
        toast.error("Erro ao buscar inscritos.");
      }
    }

    fetchData();
  }, [events])

  return (
    <>
      <Title title="Atividades"/>
      <AtividadesTable data={tableData} />
    </>
  );
};

export default AdminAtividades;
