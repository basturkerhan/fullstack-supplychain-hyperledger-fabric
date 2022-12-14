import { AiFillHome, AiOutlineCheck } from "react-icons/ai";
import {MdCreate, MdScreenSearchDesktop, MdAppRegistration} from "react-icons/md";

const menuData = [
    {icon:<AiFillHome />, name:"Anasayfa", url:"/shipper", isOnlyAdminAccess: false, subMenuList: []},
    {icon:<MdScreenSearchDesktop />, name:"Ürün Sorgula", url:"/shipper/orders/search", isOnlyAdminAccess: false, subMenuList: []},
    {icon:<MdAppRegistration />, name:"Sevkiyat Kaydı Oluştur", url:"/shipper/orders/create-shipment", isOnlyAdminAccess: false, subMenuList: []},
    {icon:<AiOutlineCheck />, name:"Nakliye Sevkiyatı", url:"/shipper/orders/transport-shipment", isOnlyAdminAccess: false, subMenuList: []},
    {icon:<MdCreate />, name:"Nakliyeci Ekle", url:"/shipper/create", isOnlyAdminAccess: true, subMenuList: []},
]
export default menuData;