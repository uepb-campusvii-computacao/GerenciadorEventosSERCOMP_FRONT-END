import { FaUser, FaMoneyBillWave, FaExclamation } from "react-icons/fa";
import InfoCard from "../../../components/AdminModule/InfoCard/InfoCard";

const AdminHome = () => {
  return (
    <div className="grid grid-cols-1 gap-4 px-6 mt-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <InfoCard
        icon={<FaUser className="h-12 w-12 text-white " />}
        bgColor="bg-green-400"
        title="Total de inscritos"
        value="???"
      />
      <InfoCard
        icon={<FaMoneyBillWave className="h-12 w-12 text-white" />}
        bgColor="bg-blue-400"
        title="Dinheiro arrecadado"
        value="???"
      />
      <InfoCard
        icon={<FaExclamation className="h-12 w-12 text-white" />}
        bgColor="bg-orange-400"
        title="Inscrições pendentes"
        value="???"
      />
    </div>
  );
};

export default AdminHome;
