import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SidebarMenu from "./SidebarMenu";

const Sidebar = ({show,handleClose, MenuData}) => {
  return (
      <Offcanvas id="sidebar" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarMenu MenuData={MenuData} handleClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
  );
}

export default Sidebar;