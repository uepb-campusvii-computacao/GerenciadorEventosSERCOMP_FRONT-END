import { FaBars, FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const Navbar = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <div className="bg-gray-800 px-4 py-3 flex justify-between">
      <div className="flex items-center text-xl">
        <FaBars className="text-white me-4 cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}/>
        <span className="text-white font-semibold">Gerenciador de Eventos</span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="relative">
          <button className="text-white group">
            <FaUserCircle className="w-6 h-6 mt-1" />
            <div className="z-10 hidden bg-white absolute rounded-lg shadow w-32 group-focus:block top-full right-0">
              <ul className="py-2 text-sm">
                <li>
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" href="#">Log Out</a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Navbar;
