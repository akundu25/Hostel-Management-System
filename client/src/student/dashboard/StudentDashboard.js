import React from "react";
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import Card from "../../components/Cards/Card.js";
import * as icons from "../../assets/icons";

import "./StudentDashboard.css";

const sidebarItems = [
  {
    link: "/student-dashboard",
    icon: icons.dashboardIcon,
    itemName: "Dashboard",
  },
  {
    link: "/student-profile",
    icon: icons.profileIcon,
    itemName: "Profile",
  },
  {
    link: "/student-grievances",
    icon: icons.reportIcon,
    itemName: "Report Grievances",
  },
  { link: "/student-notice", icon: icons.noticeIcon, itemName: "Notice Board" },
];

const StudentDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar sidebarItems={sidebarItems} />
        </div>
        <div className="dashboard-cards">
          <div className="cards">
            <div className="cards-trio">
              <Card
                destinationName="Profile"
                destination="/student-profile"
                icon={icons.profileIcon}
              />
              <Card
                destinationName="Report Grievances"
                destination="/student-grievances"
                icon={icons.reportIcon}
              />
              <Card
                destinationName="Warden Notice"
                destination="/student-notice"
                icon={icons.noticeIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
