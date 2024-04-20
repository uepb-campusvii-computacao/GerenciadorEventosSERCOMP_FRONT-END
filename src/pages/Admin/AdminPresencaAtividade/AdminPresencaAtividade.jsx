import PresencaTable from "../../../components/AdminModule/Tables/PresencaTable";
import { useParams } from "react-router-dom";
import Title from "../../../components/Title/Title";

const data = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    presenca: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    presenca: false,
  },
];

const AdminPresencaAtividade = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <>
      <Title title="Registrar Presença"/> 
      <PresencaTable data={data} atividadeId={id} />
    </>
  );
};

export default AdminPresencaAtividade;
