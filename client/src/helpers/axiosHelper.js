import axios from "axios";
import { toast } from 'react-toastify';

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use((config) => {
  let storageToken = localStorage.getItem("token");
  if (storageToken !== "undefined") {
    const token = JSON.parse(storageToken);
    config.headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
    };
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    toast(response.data.message);
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    switch (status) {
      case 400:
        toast.error(data.message);
        break;
      case 401:
        toast.error(data.message);
        break;
      case 404:
        toast.error(data.message);
        break;
      case 500:
        toast.error(data.message);
        break;
      default:
        toast.error(data.message);
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Users = {
  login: (user) => requests.post("/users/login", user),
  register: (user) => requests.post('/users/register', user)
};

const Orders = {
  assignShipment: (body) => requests.post("/orders/assign", body),
  create: (order) => requests.post("/orders/create", order),
  receiveShipment: (body) => requests.post("/orders/receive-shipment", body),
  history: (orderId) => requests.get(`/orders/history?orderId=${orderId}`),
  createShipment: (body) => requests.post("/orders/create-shipment", body),
  transportShipment: (body) => requests.post("/orders/transport-shipment", body)
};

export const axiosHelper = {
  Users,
  Orders
};

export default axiosHelper;
