import AtividadesTable from "../../../components/AdminModule/Tables/AtividadesTable";
import Title from "../../../components/Title/Title"

const data = [
  {
    id: "1",
    name: "Java",
    responsaveis: ["João Silva"],
    presenca: true,
  },
  {
    id: "2",
    name: "Python",
    responsaveis: ["Maria Santos", "Marcos Silva"],
    presenca: false,
  },
];

const AdminAtividades = () => {
  return (
    <>
      <Title title="Atividades"/>
      <AtividadesTable data={data} />
    </>
  );
};

export default AdminAtividades;
