import React from "react";
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import Card from "../../components/Cards/Card.js";
import * as icons from "../../assets/icons";

const sidebarItems = [
  {
    link: "/warden-dashboard",
    icon: icons.dashboardIcon,
    itemName: "Dashboard",
  },
  {
    link: "/warden-new-applications",
    icon: icons.applicationsIcon,
    itemName: "New Applications",
  },
  {
    link: "/warden-profile",
    icon: icons.profileIcon,
    itemName: "Profile",
  },
  {
    link: "/warden-students",
    icon: icons.studentsIcon,
    itemName: "Students",
  },
  {
    link: "/warden-rooms",
    icon: icons.roomsIcon,
    itemName: "Rooms",
  },
  {
    link: "/warden-grievances",
    icon: icons.reportIcon,
    itemName: "Student Grievances",
  },
  {
    link: "/warden-notices",
    icon: icons.publishIcon,
    itemName: "Publish Notice",
  },
  {
    link: "/view-warden-notices",
    icon: icons.noticeIcon,
    itemName: "View Notices",
  },
];

const WardenDashboard = () => {
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
                destination="/warden-profile"
                destinationName="Profile"
                icon={icons.profileIcon}
              />
              <Card
                destination="/warden-students"
                destinationName="Students"
                icon={icons.studentsIcon}
              />
              <Card
                destination="/warden-new-applications"
                destinationName="New Applications"
                icon={icons.applicationsIcon}
              />
            </div>
            <div className="cards-trio">
              <Card
                destination="/warden-rooms"
                destinationName="Rooms"
                icon={icons.roomsIcon}
              />
              <Card
                destination="/warden-grievances"
                destinationName="Student Grievances"
                icon={icons.reportIcon}
              />
              <Card
                destination="/warden-notices"
                destinationName="Publish Notice"
                icon={icons.publishIcon}
              />
            </div>
            <div className="cards-trio">
              <Card
                destination="/view-warden-notices"
                destinationName="View Notices"
                icon={icons.noticeIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
