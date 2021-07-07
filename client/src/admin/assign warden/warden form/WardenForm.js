import React, { useState } from "react";
import * as icons from "../../../assets/icons";

import "./WardenForm.css";

const WardenForm = ({ wardenData, setWarden, number, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const handleShowConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="warden">
      <div className="warden-double-info">
        <label htmlFor={["name", number].join("")}>NAME*</label>
        <input
          type="text"
          id={["name", number].join("")}
          name="name"
          value={wardenData.name}
          placeholder="eg: Arnab Kundu"
          onChange={(e) => setWarden({ ...wardenData, name: e.target.value })}
          disabled={disabled}
          required
        />
        <label htmlFor={["email", number].join("")}>EMAIL*</label>
        <input
          type="email"
          id={["email", number].join("")}
          name="email"
          value={wardenData.email}
          placeholder="eg: akundu@gmail.com"
          onChange={(e) => setWarden({ ...wardenData, email: e.target.value })}
          disabled={disabled}
          required
        />
      </div>
      <div className="warden-double-info">
        <label htmlFor={["mobile", number].join("")}>MOBILE NUMBER*</label>
        <input
          type="tel"
          id={["mobile", number].join("")}
          name="mobile"
          value={wardenData.mobile}
          onChange={(e) => setWarden({ ...wardenData, mobile: e.target.value })}
          disabled={disabled}
          required
        />
        <label htmlFor={["designation", number].join("")}>DESIGNATION</label>
        <input
          type="text"
          id={["designation", number].join("")}
          name="designation"
          value={wardenData.designation}
          onChange={(e) =>
            setWarden({ ...wardenData, designation: e.target.value })
          }
          disabled={disabled}
        />
      </div>
      <div className="warden-double-info">
        <label htmlFor={["password", number].join("")}>PASSWORD*</label>
        <input
          type={showPassword ? "text" : "password"}
          id={["password", number].join("")}
          name="password"
          value={wardenData.password || ""}
          onChange={(e) =>
            setWarden({ ...wardenData, password: e.target.value })
          }
          disabled={disabled}
          required
        />
        <img
          src={showPassword ? icons.invisibleIcon : icons.visibleIcon}
          alt="password visibility control"
          className="warden-pwd-visibility"
          onClick={handleShowPasswordClick}
        />
        <label htmlFor={["confirmPassword", number].join("")}>
          CONFIRM PASSWORD*
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id={["confirmPassword", number].join("")}
          name="confirmPassword"
          value={wardenData.confirmPassword || ""}
          onChange={(e) =>
            setWarden({ ...wardenData, confirmPassword: e.target.value })
          }
          disabled={disabled}
          required
        />
        <img
          src={showConfirmPassword ? icons.invisibleIcon : icons.visibleIcon}
          alt="password visibility control"
          className="warden-pwd-visibility"
          onClick={handleShowConfirmPasswordClick}
        />
      </div>
    </div>
  );
};

export default WardenForm;
