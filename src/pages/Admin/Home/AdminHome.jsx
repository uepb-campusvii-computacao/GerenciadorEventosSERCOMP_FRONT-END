import { useContext, useEffect, useState } from "react";
import { FaExclamation, FaMoneyBillWave, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import { BACKEND_DEFAULT_URL } from "../../../backendPaths";
import InfoCard from "../../../components/AdminModule/InfoCard/InfoCard";
import EventContext from "../../../context/Event/EventContext";
import Loading from "../../Loading/Loading";

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [financialData, setFinancialData] = useState({
    totalInscritos: 0,
    totalArrecadado: 0,
    inscricoesPendentes: 0,
  });
  const { events } = useContext(EventContext);

  useEffect(() => {
    const fetchFinancialInformation = async () => {
      try {
        const FINANCIAL_INFORMATION_ENDPOINT = `${BACKEND_DEFAULT_URL}/admin/events/${events[0].uuid_evento}/dashboard`;
        const response = await axiosInstance.get(FINANCIAL_INFORMATION_ENDPOINT);

        const data = response.data;
        
        setFinancialData({
          totalInscritos: data.total_inscritos,
          totalArrecadado: data.total_arrecadado,
          inscricoesPendentes: data.inscricoes_pendentes,
        });
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
        toast.error("Falha ao buscar dados financeiros. Tente novamente mais tarde.");
      }
      setIsLoading(false);
    };

    fetchFinancialInformation();
  }, [events]);

  return (
    <>
      {
        isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-4 px-6 mt-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            <InfoCard
              icon={<FaUser className="h-12 w-12 text-white " />}
              bgColor="bg-green-400"
              title="Total de inscritos"
              value={financialData.totalInscritos.toString()}
            />
            <InfoCard
              icon={<FaMoneyBillWave className="h-12 w-12 text-white" />}
              bgColor="bg-blue-400"
              title="Dinheiro arrecadado"
              value={
                new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                ).format(financialData.totalArrecadado)
              }
            />
            <InfoCard
              icon={<FaExclamation className="h-12 w-12 text-white" />}
              bgColor="bg-orange-400"
              title="Inscrições pendentes"
              value={financialData.inscricoesPendentes.toString()}
            />
          </div>
        )
      }
    </>
  );
};

export default AdminHome;