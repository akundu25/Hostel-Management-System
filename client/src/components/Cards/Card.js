import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

const Card = ({ destinationName, destination, icon }) => {
  return (
    <Link to={destination} className="card-body">
      <img src={icon} alt="" />
      {destinationName}
    </Link>
  );
};

export default Card;
