import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/axiosInstance";
import InscritosTable from "@/components/AdminModule/Tables/InscritosTable";
import Title from "@/components/ui/Title";
import EventContext from "@/context/Event/EventContext";
import Loading from "@/pages/Loading/Loading";

const inscricoesEndpoint = (id_evento) => {
  return `/admin/events/${id_evento}/inscricoes`;
};

const AdminInscritosEvento = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { events } = useContext(EventContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(inscricoesEndpoint(events[0].uuid_evento))

        const mappedResponse = data.all_subscribers.map((item) => {
          return {
            id: item.uuid_user,
            name: item.nome,
            email: item.email,
            nome_cracha:item.nome_cracha,
            paymentStatus: item.status_pagamento,
            credential: item.credenciamento,
          };
        });

        setTableData(mappedResponse);
      } catch (error) {
        console.error("Erro ao buscar inscritos:", error);
        toast.error("Erro ao buscar inscritos.");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [events]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Title title="Inscrições" />
          <InscritosTable data={tableData} />
        </>
      )}
    </>
  );
};

export default AdminInscritosEvento;
