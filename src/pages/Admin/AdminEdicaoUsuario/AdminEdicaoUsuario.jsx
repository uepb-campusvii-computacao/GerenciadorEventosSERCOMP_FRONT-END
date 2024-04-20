import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Title from "../../../components/Title/Title";

const AdminEdicaoUsuario = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
  });

  async function onSubmit(data) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const {
      nome,
      nome_cracha,
      email,
      instituicao,
      minicurso,
      workshop,
      oficina,
      status_pagamento,
    } = data;

    const requestData = {
      nome,
      nome_cracha,
      email,
      instituicao,
      minicurso,
      workshop,
      oficina,
      status_pagamento,
    };

    console.log(requestData);
  }

  return (
    <section className="max-w-3xl mx-auto py-8">
      <Title title="Editar Usuário" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 max-w-3xl mx-auto bg-white p-7 rounded-lg text-black shadow"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Dados Pessoais</h2>
          <input
            {...register("nome")}
            required
            type="text"
            placeholder="Nome"
            className="input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3"
          />
          <input
            {...register("nome_cracha")}
            required
            type="text"
            placeholder="Nome no crachá"
            className="input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3"
          />
          <input
            {...register("email")}
            required
            type="email"
            placeholder="Email"
            className="input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3"
          />
          <input
            {...register("instituicao")}
            required
            type="text"
            placeholder="Instituição"
            className="input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-lg font-bold">Atividades</p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            <select
              {...register("minicurso")}
              className="select text-gray-900 bg-white shadow border border-gray-300 rounded p-3"
            >
              <option value="">Minicurso...</option>
              <option value="minicurso-id-1">Minicurso 1</option>
              <option value="minicurso-id-2">Minicurso 2</option>
            </select>
            <select
              {...register("workshop")}
              className="select text-gray-900 bg-white shadow border border-gray-300 rounded p-3"
            >
              <option value="">Workshop...</option>
              <option value="workshop-id-1">Workshop 1</option>
              <option value="workshop-id-2">Workshop 2</option>
            </select>
            <select
              {...register("oficina")}
              className="select text-gray-900 bg-white shadow border border-gray-300 rounded p-3"
            >
              <option value="">Oficina...</option>
              <option value="oficina-id-1">Oficina 1</option>
              <option value="oficina-id-2">Oficina 2</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-bold">Status de Pagamento</p>
          <select
            {...register("status_pagamento")}
            className="select text-gray-900 bg-white shadow border border-gray-300 rounded p-3"
          >
            <option value="">Selecione o Status de Pagamento...</option>
            <option value="pendente">Pendente</option>
            <option value="realizado">Realizado</option>
            <option value="expirado">Expirado</option>
          </select>
        </div>

        <div className="space-y-2 flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary inline-flex items-center justify-center rounded h-10 bg-green-400 w-60 text-white font-bold"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Aguarde...
              </>
            ) : (
              "Salvar"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminEdicaoUsuario;
