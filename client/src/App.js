import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Home from "./components/Home/Home.js";
import AuthSelect from "./components/Auth/AuthSelect/AuthSelect.js";
import PasswordReset from "./components/Auth/PasswordReset.js";
import StudentDashboard from "./student/dashboard/StudentDashboard.js";
import WardenDashboard from "./warden/dashboard/WardenDashboard.js";
import WardenProfile from "./warden/profile/WardenProfile.js";
import Students from "./warden/students/Students.js";
import Rooms from "./warden/rooms/Rooms.js";
import Grievances from "./warden/student grievances/Grievances.js";
import Notice from "./warden/notices/Notice.js";
import ViewNotices from "./warden/notices/ViewNotices.js";
import NewApplications from "./warden/new applications/NewApplications.js";
import AdminDashboard from "./admin/dashboard/AdminDashboard.js";
import AdminProfile from "./admin/profile/AdminProfile.js";
import AdminSignup from "./components/Auth/AuthAdmin/AdminSignup.js";
import Form from "./components/Form/Form.js";
import PrivateRoute from "./routing/PrivateRoute.js";
import NonPrivateRoute from "./routing/NonPrivateRoute.js";
import StudentGrievances from "./student/grievance/StudentGrievances.js";
import StudentNotice from "./student/notice/StudentNotice.js";
import StudentProfile from "./student/profile/StudentProfile.js";
import FirstYearStudents from "./student records/FirstYearStudents.js";
import SecondYearStudents from "./student records/SecondYearStudents.js";
import ThirdYearStudents from "./student records/ThirdYearStudents.js";
import FourthYearStudents from "./student records/FourthYearStudents.js";
import AssignWarden from "./admin/assign warden/AssignWarden.js";
import FirstYearRooms from "./rooms/FirstYearRooms.js";
import SecondYearRooms from "./rooms/SecondYearRooms.js";
import ThirdYearRooms from "./rooms/ThirdYearRooms.js";
import FourthYearRooms from "./rooms/FourthYearRooms.js";

import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <NonPrivateRoute path="/" exact component={Home} />
          <NonPrivateRoute path="/auth" exact component={AuthSelect} />
          <NonPrivateRoute
            path="/reset-password"
            exact
            component={PasswordReset}
          />
          <NonPrivateRoute path="/student-register" exact component={Form} />
          <NonPrivateRoute path="/admin-signup" exact component={AdminSignup} />
          <PrivateRoute
            path="/student-dashboard"
            exact
            component={StudentDashboard}
            redirectRoute="/auth"
            userType="student"
          />
          <PrivateRoute
            path="/student-profile"
            exact
            component={StudentProfile}
            redirectRoute="/auth"
            userType="student"
          />
          <PrivateRoute
            path="/student-grievances"
            exact
            component={StudentGrievances}
            redirectRoute="/auth"
            userType="student"
          />
          <PrivateRoute
            path="/student-notice"
            exact
            component={StudentNotice}
            redirectRoute="/auth"
            userType="student"
          />
          <PrivateRoute
            path="/warden-dashboard"
            exact
            component={WardenDashboard}
            redirectRoute="/auth"
            userType="warden"
          />
          <PrivateRoute
            path="/warden-profile"
            exact
            component={WardenProfile}
            redirectRoute="/auth"
            userType="warden"
          />
          <PrivateRoute
            path="/warden-new-applications"
            exact
            component={NewApplications}
            redirectRoute="/auth"
            userType="warden"
          />
          <PrivateRoute
            path="/warden-students"
            exact
            component={Students}
            redirectRoute="/auth"
            userType="warden"
          />
          <PrivateRoute
            path="/warden-rooms"
            exact
            component={Rooms}
            redirectRoute="/auth"
            userType="warden"
          />
          <PrivateRoute
            path="/warden-grievances"
            exact
            component={Grievances}
            redirectRoute="/auth"
            userType="warden"
          />
          <PrivateRoute
            path="/warden-notices"
            exact
            component={Notice}
            redirectRoute="/auth"
            userType="warden"
          />
          <PrivateRoute
            path="/view-warden-notices"
            exact
            component={ViewNotices}
            redirectRoute="/auth"
            userType="warden"
          />
          <PrivateRoute
            path="/admin-dashboard"
            exact
            component={AdminDashboard}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/admin-profile"
            exact
            component={AdminProfile}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/admin-assign-warden"
            exact
            component={AssignWarden}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/first-year-rooms"
            exact
            component={FirstYearRooms}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/second-year-rooms"
            exact
            component={SecondYearRooms}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/third-year-rooms"
            exact
            component={ThirdYearRooms}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/fourth-year-rooms"
            exact
            component={FourthYearRooms}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/first-year-students"
            exact
            component={FirstYearStudents}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/second-year-students"
            exact
            component={SecondYearStudents}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/third-year-students"
            exact
            component={ThirdYearStudents}
            redirectRoute="/auth"
            userType="admin"
          />
          <PrivateRoute
            path="/fourth-year-students"
            exact
            component={FourthYearStudents}
            redirectRoute="/auth"
            userType="admin"
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
