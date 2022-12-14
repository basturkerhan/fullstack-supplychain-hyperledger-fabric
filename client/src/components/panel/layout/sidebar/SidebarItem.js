import React from 'react'
import { Accordion } from "react-bootstrap";
import {Link} from "react-router-dom";
import { useUserRole } from '../../../../hooks/useUserRole';

export const SidebarItem = ({menuItem, index, handleClose}) => {

  const userRole = useUserRole();
  if(menuItem.isOnlyAdminAccess && userRole!=="admin") {
    return null;
  }

  return (
    <Accordion.Item onClick={()=>handleClose()} style={{textDecoration:"none"}} as={Link} to={menuItem.url} className="sidebar-menu-item" eventKey={index}>
      <Accordion.Button>
          <span>{menuItem.icon}</span>
          <span className="mx-2">{menuItem.name}</span>
      </Accordion.Button>
    </Accordion.Item>
  )
}

export default SidebarItem;