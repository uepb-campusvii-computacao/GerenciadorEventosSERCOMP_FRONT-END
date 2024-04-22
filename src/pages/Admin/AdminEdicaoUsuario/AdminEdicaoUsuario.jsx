import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import Title from "../../../components/Title/Title";
import EventContext from "../../../context/Event/EventContext";
import Loading from "../../Loading/Loading";

const getParticipantDataEndpoint = (event_id, user_id) => {
  return `/event/${event_id}/inscricao/${user_id}`;
};

const getFormDataEndpoint = (event_id) => {
  return `/admin/events/${event_id}/atividades`;
};

const editParticipantDataEndpoint = (user_id) => {
  return `/admin/user/${user_id}`;
};

const AdminEdicaoUsuario = () => {
  const { user_id } = useParams();
  const { events } = useContext(EventContext);
  const [atividades, setAtividades] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data : user } = await axiosInstance.get(
        getParticipantDataEndpoint(events[0].uuid_evento, user_id)
      );

      const { data : activities } = await axiosInstance.get(
        getFormDataEndpoint(events[0].uuid_evento)
      );

      await Promise.all([user, activities]);

      setAtividades(activities);

      const {
        personal_user_information: { nome, nome_cracha, email, instituicao },
        status_pagamento,
        atividades,
      } = user;

      setValue("nome", nome);
      setValue("nome_cracha", nome_cracha);
      setValue("email", email);
      setValue("instituicao", instituicao);
      setValue("status_pagamento", status_pagamento);

      const oficina = atividades.find(a => a.tipo_atividade === "OFICINA");
      const minicurso = atividades.find(a => a.tipo_atividade === "MINICURSO");
      const workshop = atividades.find(a => a.tipo_atividade === "WORKSHOP");

      setValue("oficina", oficina ? oficina.uuid_atividade : "");
      setValue("minicurso", minicurso ? minicurso.uuid_atividade : "");
      setValue("workshop", workshop ? workshop.uuid_atividade : "");

      setIsLoading(false);
    };

    fetchData(); 
  }, [setValue, events, user_id]);

  async function onSubmit(data) {
    try{
      await axiosInstance.put(editParticipantDataEndpoint(user_id), {...data})
      toast.success("Participante Atualizado!")
    }catch(error){
      console.log(error)
      toast.error("Erro ao atualizar participante!")
    }
  }

  if(isLoading){
    return <Loading />
  }

  return (
    <section className="max-w-3xl mx-auto">
      <Title title="Editar Usuário" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 max-w-3xl mx-auto bg-white p-7 rounded-lg text-black shadow"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Dados Pessoais</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm text-gray-900 font-bold"
              >
                Nome
              </label>
              <input                
                required
                type="text"
                id="first_name"
                placeholder="Nome"
                className={`${isSubmitting ? 'blurred' : ''} input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3`}
                {...register("nome", {required: true})}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="nome_cracha"
                className="block mb-2 text-sm text-gray-900 font-bold"
              >
                Nome Cracha
              </label>
              <input
                required
                type="text"
                id="nome_cracha"
                placeholder="Nome no crachá"
                className={`${isSubmitting ? 'blurred' : ''} input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3`}
                {...register("nome_cracha", {required: true})}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-900 font-bold"
              >
                E-Mail
              </label>
              <input
                required
                type="email"
                id="email"
                placeholder="Email"
                className={`${isSubmitting ? 'blurred' : ''} input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3`}
                {...register("email", {required: true})}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="instituicao"
                className="block mb-2 text-sm text-gray-900 font-bold"
              >
                Instituição
              </label>
              <input                
                required
                type="text"
                id="instituicao"
                placeholder="Instituição"
                className={`${isSubmitting ? 'blurred' : ''} input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3`}
                {...register("instituicao", {required: true})}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-bold">Atividades</p>
          <div className="flex flex-col gap-4 w-full">
            <select              
              className={`${isSubmitting ? 'blurred' : ''} select text-gray-900 bg-white shadow border border-gray-300 rounded p-3`}
              {...register("minicurso")}
              disabled={isSubmitting}
            >
              <option value="">Minicurso...</option>
              {Array.isArray(atividades) &&
                atividades
                  .filter((a) => a.tipo_atividade === "MINICURSO")
                  .map((mc) => (
                    <option key={mc.uuid_atividade} value={mc.uuid_atividade}>
                      {mc.nome}
                    </option>
                  ))}
            </select>
            <select
              className={`${isSubmitting ? 'blurred' : ''} select text-gray-900 bg-white shadow border border-gray-300 rounded p-3`}
              {...register("workshop")}
              disabled={isSubmitting}
            >
              <option value="">Workshop...</option>
              {Array.isArray(atividades) &&
                atividades
                  .filter((a) => a.tipo_atividade === "WORKSHOP")
                  .map((ws) => (
                    <option key={ws.uuid_atividade} value={ws.uuid_atividade}>
                      {ws.nome}
                    </option>
                  ))}
            </select>
            <select
              className={`${isSubmitting ? 'blurred' : ''} select text-gray-900 bg-white shadow border border-gray-300 rounded p-3`}
              {...register("oficina")}
              disabled={isSubmitting}
            >
              <option value="">Oficina...</option>
              {Array.isArray(atividades) &&
                atividades
                  .filter((a) => a.tipo_atividade === "OFICINA")
                  .map((oc) => (
                    <option key={oc.uuid_atividade} value={oc.uuid_atividade}>
                      {oc.nome}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-bold">Status de Pagamento</p>
          <select
            {...register("status_pagamento")}
            className={`${isSubmitting ? 'blurred' : ''} select text-gray-900 bg-white shadow border border-gray-300 rounded p-3`}
          >
            <option value="">Selecione o Status de Pagamento...</option>
            <option value="PENDENTE">Pendente</option>
            <option value="REALIZADO">Realizado</option>
            <option value="EXPIRADO">Expirado</option>
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
