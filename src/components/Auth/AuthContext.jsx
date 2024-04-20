import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from 'prop-types'
import { BACKEND_DEFAULT_URL } from '../../backendPaths';

const AuthContext = createContext();
const LOGIN_ENDPOINT = `${BACKEND_DEFAULT_URL}/login`;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (data) => {
    try {
      const response = await axios.post(LOGIN_ENDPOINT, data);
      const { token } = response.data;

      localStorage.setItem('authToken', token);

      setIsAuthenticated(true);
      toast.success('Login bem-sucedido!');

    } catch (error) {
      console.error("Erro ao tentar logar:", error);

      let errorMessage = "Falha ao efetuar login. Verifique suas credenciais.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    toast.info('Você saiu.');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthContext;
