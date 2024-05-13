import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "./components/AdminModule/Layout/Layout";
import { AuthProvider } from "./context/Auth/AuthContext";
import PrivateRoute from "./context/Auth/PrivateRoute";
import AdminEdicaoUsuario from "./pages/Admin/AdminEdicaoUsuario/AdminEdicaoUsuario";
import AdminInscritosEvento from "./pages/Admin/AdminInscritosEvento/AdminInscritosEvento";
import AdminPresencaAtividade from "./pages/Admin/AdminPresencaAtividade/AdminPresencaAtividade";
import AdminAtividades from "./pages/Admin/Atividades/AdminAtividades";
import AdminCredenciamento from "./pages/Admin/Credenciamento/AdminCredenciamento";
import AdminHome from "./pages/Admin/Home/AdminHome";
import LoginForm from "./pages/Login/LoginForm";
import AdminEdicaoAtividade from "./pages/Admin/AdminEdicaoAtividade/AdminEdicaoAtividade";
import AdminLoja from "./pages/Admin/Loja/AdminLoja";
import AdminEdicaoProduto from "./pages/Admin/AdminEdicaoProduto/AdminEdicaoProduto";
import AdminCompradores from "./pages/Admin/Loja/AdminCompradores";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={1500} limit={3} closeOnClick pauseOnHover />
        
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route exact path="/" element={<AdminHome />} />
              <Route exact path="/credenciamento" element={<AdminCredenciamento />} />
              <Route exact path="/inscritos" element={<AdminInscritosEvento />} />
              <Route exact path="/atividades" element={<AdminAtividades />} />
              <Route exact path="/participante/editar/:user_id" element={<AdminEdicaoUsuario />} />
              <Route exact path="/atividades/:id" element={<AdminPresencaAtividade />} />
              <Route exact path="/atividades/editar/:atividade_id" element={<AdminEdicaoAtividade />} />
              <Route exact path="/loja" element={<AdminLoja />} />
              <Route exact path="/loja/produto/:produto_id/editar" element={<AdminEdicaoProduto />} />
              <Route exact path="/loja/compras/:produto_id" element={<AdminCompradores />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
