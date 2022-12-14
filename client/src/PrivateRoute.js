import { Navigate, Outlet } from 'react-router-dom';
import { useUserRole } from "./hooks/useUserRole";
import { useUserOrganization} from "./hooks/useUserOrganization";
import { Fragment } from 'react';
import Navbar from './components/panel/layout/Navbar';
import ProducerMenu from "./data/producerSidebarMenuData";
import ShipperMenu from "./data/shipperSidebarMenuData";
import RetailerMenu from "./data/retailerSidebarMenuData";
import {organizationToRole} from "./mappings/roleOrganizationMapping";

const PrivateRoute = ({allowedRole, allowedOrganization}) => {
  const role = useUserRole();
  const organization = useUserOrganization();

  const sidebarMenus = {
    producer: ProducerMenu,
    shipper: ShipperMenu,
    retailer: RetailerMenu
  }

  if (role !== null) {
    const isAllowed = (role === allowedRole || role === "admin") && (organization === allowedOrganization);
    return isAllowed ? 
    <Fragment>
        <Navbar MenuData={sidebarMenus[organizationToRole[allowedOrganization]]} />
        <Outlet /> 
    </Fragment>
    : <Navigate to={"/"} replace />; // or loading indicator, etc...
  }
  return <Navigate to={"/login"} replace />;
};

export default PrivateRoute;