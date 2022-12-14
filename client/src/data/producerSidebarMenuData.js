import { AiFillHome } from "react-icons/ai";
import {MdProductionQuantityLimits, MdCreate, MdLocalShipping, MdScreenSearchDesktop} from "react-icons/md";

const menuData = [
    {icon:<AiFillHome />, name:"Anasayfa", url:"/producer", subMenuList: [], isOnlyAdminAccess: false},
    {
        icon: <MdProductionQuantityLimits />,
        name: "Ürün",
        url: "#",
        isOnlyAdminAccess: false,
        subMenuList: [
            {icon:<MdScreenSearchDesktop />, name:"Ürün Sorgula", url:"/producer/orders/search", isOnlyAdminAccess: false, subMenuList: []},
            {icon:<MdCreate />, name:"Ürün Ekle", url:"/producer/orders/create"},
        ]
    },
    {
        icon: <MdLocalShipping />,
        name: "Sevkiyat",
        url: "#",
        isOnlyAdminAccess: false,
        subMenuList: [
            {icon:<MdCreate />, name:"Sevkiyat Tanımla", url:"/producer/orders/assign-shipment", isOnlyAdminAccess: false},
        ]
    },
    {icon:<MdCreate />, name:"Üretici Ekle", url:"/producer/create", isOnlyAdminAccess: true, subMenuList: []},
]

export default menuData;