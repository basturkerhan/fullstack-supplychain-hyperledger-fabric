import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import PrivateRoute from "./PrivateRoute";
import { roleToOrganization } from "./mappings/roleOrganizationMapping";
import ProducerHome from "./components/producer";
import ShipperHome from "./components/shipper";
import RetailerHome from "./components/shipper";
import CreateOrder from "./components/producer/CreateOrder";
import CreateProducer from "./components/producer/CreateProducer";
import CreateShipper from "./components/shipper/CreateShipper";
import CreateShipment from "./components/shipper/CreateShipment";
import TransportShipment from "./components/shipper/TransportShipment";
import AssignShipment from "./components/producer/AssignShipment";
import CreateRetailer from "./components/retailer/CreateRetailer";
import SearchProduct from "./components/productSearch"
import ReceiveShipment from "./components/retailer/ReceiveShipment";
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import {setIsMobileDevice} from "./store/slices/device";
import { useIsMobileDevice } from "./hooks/useIsMobileDevice";


function App() {
  const dispatch = useDispatch();
  const isMobileDevice = useIsMobileDevice();
  console.log(isMobileDevice);

  useEffect(() => {
    dispatch(setIsMobileDevice(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )));
  }, []);


  return (
    <Fragment>
      {(isMobileDevice !== null) 
      && <ToastContainer position={isMobileDevice ? "top-center" : "bottom-center" } hideProgressBar /> }
      <Routes>
        <Route
          element={
            <PrivateRoute
              allowedRole="producer"
              allowedOrganization={roleToOrganization["producer"]}
            />
          }
        >
          <Route path="/producer">
            <Route path="" element={<ProducerHome />} />
            <Route path="orders/search" element={<SearchProduct />} />
            <Route path="orders/create" element={<CreateOrder />} />
            <Route path="orders/assign-shipment" element={<AssignShipment />} />
            <Route
              element={
                <PrivateRoute
                  allowedRole="admin"
                  allowedOrganization={roleToOrganization["producer"]}
                />
              }
            >
              <Route path="create" element={<CreateProducer />} />
            </Route>
          </Route>
        </Route>

        <Route
          element={
            <PrivateRoute
              allowedRole="shipper"
              allowedOrganization={roleToOrganization["shipper"]}
            />
          }
        >
          <Route path="/shipper">
            <Route path="" element={<ShipperHome />} />
            <Route path="orders/search" element={<SearchProduct />} />
            <Route path="orders/create-shipment" element={<CreateShipment />} />
            <Route
              path="orders/transport-shipment"
              element={<TransportShipment />}
            />
            <Route
              element={
                <PrivateRoute
                  allowedRole="admin"
                  allowedOrganization={roleToOrganization["shipper"]}
                />
              }
            >
              <Route path="create" element={<CreateShipper />} />
            </Route>
          </Route>
        </Route>

        <Route
          element={
            <PrivateRoute
              allowedRole="retailer"
              allowedOrganization={roleToOrganization["retailer"]}
            />
          }
        >
          <Route path="/retailer">
            <Route path="" element={<RetailerHome />} />
            <Route path="orders/search" element={<SearchProduct />} />
            <Route path="orders/receive-shipment" element={<ReceiveShipment />} />
            <Route
              element={
                <PrivateRoute
                  allowedRole="admin"
                  allowedOrganization={roleToOrganization["retailer"]}
                />
              }
            >
              <Route path="create" element={<CreateRetailer />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Fragment>
  );
}

export default App;
