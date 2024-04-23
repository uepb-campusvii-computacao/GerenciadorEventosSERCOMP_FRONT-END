import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import InscritosTable from "../../../components/AdminModule/Tables/InscritosTable";
import Title from "../../../components/Title/Title";
import EventContext from "../../../context/Event/EventContext";
import Loading from "../../Loading/Loading";

const inscricoesEndpoint = (id_evento) => {
  return `/admin/events/${id_evento}/inscricoes`;
}

const AdminInscritosEvento = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { events } = useContext(EventContext);
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const { data } = await axiosInstance.get(inscricoesEndpoint(events[0].uuid_evento))

        const mappedResponse = data.all_subscribers.map(p => {
          return {
            id: p.uuid_user,
            name: p.nome,
            email: p.email,
            paymentStatus: p.status_pagamento,
            credential: p.credenciamento,
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
            <Title title="Credenciamento"/> 
            <InscritosTable data={tableData}/>
          </>
        )
      }
    </>
  )
}

export default AdminInscritosEvento;
