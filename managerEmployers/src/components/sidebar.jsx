import { BiAlarmSnooze } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa6";

import { Link } from "react-router-dom"

export const SideBar = () => {

    const menu = [
        {
            icon: <AiOutlineDashboard className="icon_sidebar"/>,
            href: "/dashbord",
            label: "Dashboard",
            id: 1,
        },
        {
            icon: <BiAlarmSnooze className="icon_sidebar"/>,
            href: "/dashbord/employer",
            label: "Management",
            id: 2,
        },
        {
            icon: <TbCategoryPlus className="icon_sidebar"/>,
            href: "/dashbord/category",
            label: "Category",
            id: 3,
        },
        {
            icon: <CgProfile className="icon_sidebar"/>,
            href: "/dashbord/profile",
            label: "Profile",
            id: 4,
        },
        {
            icon: <FaPowerOff className="icon_sidebar "/>,
            href: "/login",
            label: "Logout",
            id: 5,
        },

    ]
    return (
        <div className="content_sidebar">
            <h1 className="title">Dashbord</h1>
            <div className="sidebar">
                    {
                        menu.map(item => {
                            return (
                                <div key={item.id} className="sidebar-items">
                                    <div>
                                        <Link className="link" to={item.href}>{item.icon} {item.label}</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}