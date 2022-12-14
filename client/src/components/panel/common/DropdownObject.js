import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const DropdownObject = ({body, itemList, align="end", drop="down"}) => {
  return (
    <DropdownButton
      align={align}
      drop={drop}
      title={body}
      id="dropdown-menu-align"
    >
        {
        itemList.map((item,index) => (
            <Dropdown.Item key={index} eventKey={index} onClick={() => item.event()}>{item.name}</Dropdown.Item>
        ))
        }
    </DropdownButton>
  )
}
