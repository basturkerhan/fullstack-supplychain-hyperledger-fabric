import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { AiOutlineMenuUnfold, AiOutlineFullscreenExit } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import Sidebar from "./sidebar/Sidebar";
import { MobileNavbar } from "./MobileNavbar";
import { SiPivotaltracker } from "react-icons/si";
import { useUserId } from "../../../hooks/useUserId";
import { useIsMobileDevice } from "../../../hooks/useIsMobileDevice";
import DropdownMenus from "../common/profile/DropdownMenus";
import SmallProfileImage from "../common/profile/SmallProfileImage";

const Navbar = ({ MenuData }) => {
  const [show, setShow] = useState(false);
  const userId = useUserId();
  const isMobileDevice = useIsMobileDevice();

  const changeSidebarShowStatus = () => {
    setShow(!show);
  };

  const browserFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  };

  return (
    <div>
      <Row id="navbar">
        <Col className="left">
          {!isMobileDevice && (
            <AiOutlineMenuUnfold
              size="1.7rem"
              onClick={changeSidebarShowStatus}
              className="navbar-button"
            />
          )}
          {/* <SiPivotaltracker style={{ marginRight: "0.2rem" }} /> */}
          <h1 id="header-text">Supply Chain</h1>
        </Col>

        {!isMobileDevice && (
          <Col className="right">
            <AiOutlineFullscreenExit
              size="1.7rem"
              onClick={browserFullScreen}
              className="navbar-button"
            />
            <div className="navbar-profile-content">
              <p>{userId}</p>
              <DropdownMenus >
                <SmallProfileImage
                  src="https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156?s=170667a"
                  alt="profile"
                />
              </DropdownMenus>
            </div>
          </Col>
        )}
      </Row>

      <Sidebar
        MenuData={MenuData}
        show={show}
        handleClose={changeSidebarShowStatus}
      />
      {isMobileDevice && <MobileNavbar onClick={changeSidebarShowStatus} />}
    </div>
  );
};

export default Navbar;
