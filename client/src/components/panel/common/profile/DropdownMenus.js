import React from 'react'
import { batch, useDispatch } from "react-redux";
import {
  setUserRole,
  setUserId,
  setUserOrganization,
} from "../../../../store/slices/user";
import { useNavigate } from "react-router-dom";
import { DropdownObject } from '../DropdownObject';

const DropdownMenus = ({children, align, drop}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const exitHandler = () => {
        batch(() => {
          dispatch(setUserRole(null));
          dispatch(setUserId(null));
          dispatch(setUserOrganization(null));
        });
        localStorage.removeItem("token");
        navigate("/login");
      }


    const dropdownItemList = [
        {name: "Profil", event: null},
        {name: "Mesajlar", event: null},
        {name: "İstekler", event: null},
        {name: "Çıkış Yap", event: exitHandler},
      ]
  return (
    <DropdownObject itemList={dropdownItemList} align={align} drop={drop} body={children} />
  )
}

export default DropdownMenus;
