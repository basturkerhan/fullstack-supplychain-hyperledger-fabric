import React from 'react'
import SidebarDropdownItem from "./SidebarDropdownItem";
import SidebarItem from "./SidebarItem";
import Accordion from 'react-bootstrap/Accordion';

export const SidebarMenu = ({MenuData, handleClose}) => {
  return (
    <Accordion defaultActiveKey="0">
        {
            MenuData.map((menuItem,index) => {
                return (menuItem.subMenuList.length > 0)
                ? <SidebarDropdownItem handleClose={handleClose} key={index} menuItem={menuItem} index={index} />
                : <SidebarItem handleClose={handleClose} key={index} menuItem={menuItem} index={index} />
            })
        }
    </Accordion>
  )
}

export default SidebarMenu;