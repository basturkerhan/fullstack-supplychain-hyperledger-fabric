import React from "react";
import { Row, Col } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import Image from "react-bootstrap/Image";
import DropdownMenus from "../common/profile/DropdownMenus";

export const MobileNavbar = ({ onClick }) => {

  return (
    <div id="mobile-navbar">
      <Row>
        <Col className="left">
          <AiOutlineMenu
            size="2rem"
            onClick={onClick}
            className="navbar-button"
          />
        </Col>
        <Col className="center">
            <Image id="mobile-navbar-button"
              roundedCircle={true}
              src="https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156?s=170667a"
              alt="profile image"
            />
        </Col>
        <Col className="right">
        <DropdownMenus align="end" drop="up">
                <AiOutlineSetting size="2rem"/>
              </DropdownMenus>
        </Col>
      </Row>
    </div>
  );
};
