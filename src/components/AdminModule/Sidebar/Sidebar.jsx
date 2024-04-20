import { FaAddressCard, FaHome, FaUser } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import PropTypes from "prop-types";
import paths from "../../../paths.js"

const SidebarItem = ({ nome, link, icon }) => {
  return (
    <a href={link} className="flex items-center px-3">
      {icon}
      <span>{nome}</span>
    </a>
  );
};

const Sidebar = ({ sidebarOpen }) => {
  return (
    <div
      className={`${
        sidebarOpen ? " block " : " hidden "
      } w-64 bg-gray-800 h-full px-4 py-2`}
    >
      <div>
        <div className="flex flex-col items-center justify-center">
          <h1 className={`${styles.sidebarTitle} text-3lg text-white font-bold`}>
            Menu
          </h1>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <ul className="mt-3 text-white font-bold">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <SidebarItem 
              nome="Home"
              link={paths.home}
              icon={<FaHome className="w-6 h-6 mr-2 -mt-1" />}
            />
          </li>
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <SidebarItem 
              nome="Credenciamento"
              link={paths.credenciamento}
              icon={<FaAddressCard className="w-6 h-6 mr-2 -mt-1" />}
            />
          </li>
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <SidebarItem 
              nome="Atividades"
              link={paths.atividades}
              icon={<FaUser className="w-6 h-6 mr-2 -mt-1" />}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

SidebarItem.propTypes = {
  nome: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
