import Navbar from '../Navbar/Navbar'
import PropTypes from "prop-types";

const Dashboard = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <div className={`w-full`}>
      <Navbar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  )
}

Dashboard.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Dashboard
