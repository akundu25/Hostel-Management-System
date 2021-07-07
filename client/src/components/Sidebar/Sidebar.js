import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = ({ sidebarItems }) => {
  return (
    <ul className="sidebar-options">
      {sidebarItems.map((item, index) => (
        <li key={index} className="sidebar-list-item">
          <Link to={item.link} className="item-link">
            <img src={item.icon} alt="" className="sidebar-icon" />
            {item.itemName}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
