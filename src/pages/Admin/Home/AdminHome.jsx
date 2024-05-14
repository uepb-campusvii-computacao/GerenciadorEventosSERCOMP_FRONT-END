import axiosInstance from "@/axiosInstance";
import { BACKEND_DEFAULT_URL } from "@/backendPaths";
import InfoCard from "@/components/AdminModule/Cards/InfoCard";
import EventContext from "@/context/Event/EventContext";
import Loading from "@/pages/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { FaMoneyBillWave, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import PieChart from "../../../components/ui/charts/PieChart/PieChart";

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [financialData, setFinancialData] = useState({
    totalInscritos: 0,
    totalCredenciados: 0,
    totalArrecadado: {totalArrecadadoInscricoes: 0, totalArrecadadoVendas: 0},
    inscricoesPendentes: 0,
    inscricoesGratuitas: 0,
  });
  const { events } = useContext(EventContext);

  useEffect(() => {
    const fetchFinancialInformation = async () => {
      try {
        const FINANCIAL_INFORMATION_ENDPOINT = `${BACKEND_DEFAULT_URL}/admin/events/${events[0].uuid_evento}/dashboard`;
        const response = await axiosInstance.get(FINANCIAL_INFORMATION_ENDPOINT);

        const data = response.data;
        const {totalArrecadadoInscricoes : vInsc, totalArrecadadoVendas : vVend} = data.total_arrecadado;

        setFinancialData({
          totalInscritos: data.total_inscritos,
          totalCredenciados: data.total_credenciados,
          totalArrecadado:  {
            total_arrecadado_inscricoes: vInsc ? vInsc : 0, 
            total_arrecadado_vendas: vVend ? vVend : 0},
          inscricoesPendentes: data.inscricoes_pendentes,
          inscricoesGratuitas: data.inscricoes_gratuitas          
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
          <>
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
                title="Dinheiro Inscrições"
                value={
                  new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  ).format(financialData.totalArrecadado.total_arrecadado_inscricoes)
                }
              />
              <InfoCard
                icon={<FaMoneyBillWave className="h-12 w-12 text-white" />}
                bgColor="bg-purple-400"
                title="Dinheiro Vendas"
                value={
                  new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  ).format(financialData.totalArrecadado.total_arrecadado_vendas)
                }
              />
            </div>
            <div className="lg:flex gap-4 px-6 mt-4 mb-8 sm:flex-row">
              <PieChart 
                title={"INSCRIÇÕES REALIZADAS"} 
                data={[
                  { name: 'Pagas', value: financialData.totalInscritos - (financialData.inscricoesPendentes + financialData.inscricoesGratuitas), color: '#0088FE'},
                  { name: 'Pendentes', value: financialData.inscricoesPendentes, color: '#af3d39'},
                  { name: 'Gratis', value: financialData.inscricoesGratuitas, color: '#127205'},
                ]}
                total={financialData.totalInscritos}
              />
              <PieChart 
                title={"INSCRITOS CREDENCIADOS"} 
                data={[
                  { name: 'Não credenciado', value: financialData.totalInscritos - financialData.totalCredenciados, color: '#af3d39'},
                  { name: 'Credenciado', value: financialData.totalCredenciados, color: '#127205'},
                ]}
                total={financialData.totalInscritos}
              />
            </div>
          </>
        )
      }
    </>
  );
};

export default AdminHome;