import CredenciamentoTable from "../../../components/AdminModule/Tables/CredenciamentoTable"
import Title from "../../../components/Title/Title";

const data = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      paymentStatus: "Pago",
      credential: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      paymentStatus: "Pendente",
      credential: false,
    }
  ];

const AdminCredenciamento = () => {
  return (
    <>
      <Title title="Credenciamento"/> 
      <CredenciamentoTable data={data}/>
    </>
  )
}

export default AdminCredenciamento
