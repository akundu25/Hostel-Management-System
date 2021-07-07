import React from "react";
import Navbar from "../../components/Navbar/Navbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import Card from "../../components/Cards/Card.js";
import * as icons from "../../assets/icons";

const sidebarItems = [
  {
    link: "/admin-dashboard",
    icon: icons.dashboardIcon,
    itemName: "Dashboard",
  },
  {
    link: "/admin-profile",
    icon: icons.profileIcon,
    itemName: "Profile",
  },
  {
    link: "/first-year-students",
    icon: icons.studentsIcon,
    itemName: "First year students",
  },
  {
    link: "/second-year-students",
    icon: icons.studentsIcon,
    itemName: "Second year students",
  },
  {
    link: "/third-year-students",
    icon: icons.studentsIcon,
    itemName: "Third year students",
  },
  {
    link: "/fourth-year-students",
    icon: icons.studentsIcon,
    itemName: "Fourth year students",
  },
  {
    link: "/admin-assign-warden",
    icon: icons.wardensIcon,
    itemName: "Assign wardens",
  },
  {
    link: "/first-year-rooms",
    icon: icons.roomsIcon,
    itemName: "Rooms of 1st year",
  },
  {
    link: "/second-year-rooms",
    icon: icons.roomsIcon,
    itemName: "Rooms of 2nd year",
  },
  {
    link: "/third-year-rooms",
    icon: icons.roomsIcon,
    itemName: "Rooms of 3rd year",
  },
  {
    link: "/fourth-year-rooms",
    icon: icons.roomsIcon,
    itemName: "Rooms of 4th year",
  },
];

const AdminDashboard = () => {
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
                destination="/admin-profile"
                destinationName="Profile"
                icon={icons.profileIcon}
              />
              <Card
                destination="/first-year-students"
                destinationName="First Year Students"
                icon={icons.studentsIcon}
              />
              <Card
                destination="/second-year-students"
                destinationName="Second Year Students"
                icon={icons.studentsIcon}
              />
            </div>
            <div className="cards-trio">
              <Card
                destination="/third-year-students"
                destinationName="Third Year Students"
                icon={icons.studentsIcon}
              />
              <Card
                destination="/fourth-year-students"
                destinationName="Fourth Year Students"
                icon={icons.studentsIcon}
              />
              <Card
                destination="/admin-assign-warden"
                destinationName="Assign Wardens"
                icon={icons.wardensIcon}
              />
            </div>
            <div className="cards-trio">
              <Card
                destination="/first-year-rooms"
                destinationName="Rooms of 1st year"
                icon={icons.roomsIcon}
              />
              <Card
                destination="/second-year-rooms"
                destinationName="Rooms of 2nd year"
                icon={icons.roomsIcon}
              />
              <Card
                destination="/third-year-rooms"
                destinationName="Rooms of 3rd year"
                icon={icons.roomsIcon}
              />
            </div>
            <div className="cards-trio">
              <Card
                destination="/fourth-year-rooms"
                destinationName="Rooms of 4th year"
                icon={icons.roomsIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
