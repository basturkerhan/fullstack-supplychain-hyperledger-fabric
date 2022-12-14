import { AiFillHome, AiOutlineCheck } from "react-icons/ai";
import {MdCreate, MdScreenSearchDesktop} from "react-icons/md";

const menuData = [
    {icon:<AiFillHome />, name:"Anasayfa", url:"/retailer", isOnlyAdminAccess: false, subMenuList: []},
    {icon:<MdScreenSearchDesktop />, name:"Ürün Sorgula", url:"/retailer/orders/search", isOnlyAdminAccess: false, subMenuList: []},
    {icon:<AiOutlineCheck />, name:"Sevkiyatı Onayla", url:"/retailer/orders/receive-shipment", isOnlyAdminAccess: false, subMenuList: []},
    {icon:<MdCreate />, name:"Nakliyeci Ekle", url:"/retailer/create", isOnlyAdminAccess: true, subMenuList: []},
]
export default menuData;