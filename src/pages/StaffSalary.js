// src/pages/DashboardHome.jsx

import React , { useState, } from 'react';
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header"
import '../App.css';

function StaffSalary() {
   const [drawerOpen, setDrawerOpen] = useState(false);

   
 const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
    return (
        <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <Header toggleDrawer={toggleDrawer} title="Orders Page" />

                {drawerOpen && <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />}
                    <h1>StaffSalary</h1>
        </div>
            
           
       
    );
}

export default StaffSalary;