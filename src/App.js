import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import Announcements from "./pages/Announcements";
import Career from "./pages/Career";
import ContactUs from "./pages/ContactUs";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";
import CloudServices from "./pages/CloudServices";
import DataServices from "./pages/DataServices";
import NetworkingServices from "./pages/NetworkingServices";
import SecurityServices from "./pages/SecurityServices";
import SoftwareServices from "./pages/SoftwareServices";
import MicrosoftServices from "./pages/MicrosoftServices";
import TradeSolutions from "./pages/eCMS_project";
import BTFNProjects from "./pages/BTFN_project";
import ICSProjects from "./pages/ICSProjects";
import IASProjects from "./pages/IASProjects";
import CoreBankingSystem from "./pages/CoreBankingSystem";
import NDIProject from "./pages/NDIProjects";
import Downloads from "./pages/Downloads";
import Dashboard from "./pages/dashboard"; // Ensure correct casing
import DispatchForm from './pages/dispatch_form'; // Ensure correct casing
import PrivateRoute from "./components/ProtectedRoute"; // Ensure correct casing
import DispatchHistory from './pages/dispatch_history'; // Ensure correct casing
import PdfViewer from './pages/PdfViewer';
import AddStaff from "./pages/AddStaff"; 
import AddUser from "./pages/AddUser"; 
import StaffList from "./pages/staffList";
import ApplyLeave from "./pages/applyLeave"; 
import UserProjects from "./pages/userProjects"; 
import StaffAttendence from "./pages/StaffAttendence"; 
import StaffAttendanceHR from "./pages/staffAttendenceHR"; 
import MonthlyReport from "./pages/MonthlyReport"; 
import DailyReport from "./pages/DailyReport"; 
import ViewDailyReport from "./pages/ViewDailyReport"; 
import ProfileSettings from "./pages/profileSettings"; 
import DocumentManagementSystem from "./pages/DocumentManagementSystem"; 
import WebSiteProjects from "./pages/WebSiteDevelopment"; 
import InfrastructureSetUp from "./pages/InfrastructureSetUp"; 
import EcmsIntegration from "./pages/eCMSIntegration"; 
import BsbSystem from "./pages/BSB"; 
import AgriTechFunc from "./pages/AgriTech"; 

// Import AuthProvider from hooks
import { AuthProvider } from "./hooks/auth"; // Update this import

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Page Not Found! Check The URL And Try Again!</div>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/joblistings" element={<JobListings />} />
        <Route path="/jobdetails" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cloudservices" element={<CloudServices />} />
        <Route path="/dataservices" element={<DataServices />} />
        <Route path="/networkingservices" element={<NetworkingServices />} />
        <Route path="/securityservices" element={<SecurityServices />} />
        <Route path="/softwareservices" element={<SoftwareServices />} />
        <Route path="/microsoftservices" element={<MicrosoftServices />} />
        <Route path="/ecms-project" element={<TradeSolutions />} />
        <Route path="/btfn-project" element={<BTFNProjects />} />
        <Route path="/ICS-projects" element={<ICSProjects />} />
        <Route path="/IAS-projects" element={<IASProjects />} />
        <Route path="/core-banking-system" element={<CoreBankingSystem />} />
        <Route path="/NDI-project" element={<NDIProject />} />
        <Route path="/pdf-viewer" element={<PdfViewer />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/dispatch_form" element={<DispatchForm />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/dispatch_history" element={<DispatchHistory />} />
        <Route path="/add_staff" element={<PrivateRoute element={<AddStaff />} />} />
        <Route path="/add_user" element={<PrivateRoute element={<AddUser />} />} />
        <Route path="/staff_list" element={<PrivateRoute element={<StaffList />} />} />
        <Route path="/apply_leave" element={<ApplyLeave />} />
        <Route path="/user_projects" element={<UserProjects />} />
        <Route path="/staff_attendence" element={<StaffAttendence />} />
        <Route path="/staff_attendence_hr" element={<StaffAttendanceHR />} />
        <Route path="/monthly_report" element={<MonthlyReport />} />
        <Route path="/daily_report" element={<DailyReport />} />
        <Route path="/view_daily_report" element={<ViewDailyReport />} />
        <Route path="/profile_settings" element={<ProfileSettings />} />
        <Route path="/document-management-system" element={<DocumentManagementSystem />} />
        <Route path="/website-development" element={<WebSiteProjects />} />
        <Route path="/infrastructure-setup" element={<InfrastructureSetUp />} />
        <Route path="/ecms-integrations" element={<EcmsIntegration  />} />
        <Route path="/bsb-system" element={<BsbSystem  />} />
        <Route path="/agri-tech-division" element={<AgriTechFunc  />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
