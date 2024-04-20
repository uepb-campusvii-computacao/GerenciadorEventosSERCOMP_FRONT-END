import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext";
import PrivateRoute from "./components/Auth/PrivateRoute";
import AdminLayout from "./components/AdminModule/Layout/Layout";
import AdminHome from "./pages/Admin/Home/AdminHome";
import AdminCredenciamento from "./pages/Admin/Credenciamento/AdminCredenciamento";
import AdminAtividades from "./pages/Admin/Atividades/AdminAtividades";
import AdminEdicaoUsuario from "./pages/Admin/AdminEdicaoUsuario/AdminEdicaoUsuario";
import AdminPresencaAtividade from "./pages/Admin/AdminPresencaAtividade/AdminPresencaAtividade";
import LoginForm from "./pages/Login/LoginForm";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route exact path="/" element={<AdminHome />} />
              <Route exact path="/credenciamento" element={<AdminCredenciamento />} />
              <Route exact path="/atividades" element={<AdminAtividades />} />
              <Route exact path="/participante/editar/:id" element={<AdminEdicaoUsuario />} />
              <Route exact path="/atividades/:id" element={<AdminPresencaAtividade />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
