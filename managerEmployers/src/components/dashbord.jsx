
import { SideBar } from "./sidebar"
import { Outlet } from "react-router-dom"

export const Dashbord = () => {
    return (
        <div className="dashbord">
            <SideBar />
            
            <div className="employers">
                <header>
                    <h4>Employee Management System</h4>
                </header>
                <Outlet />
            </div>
        </div>
    )
}