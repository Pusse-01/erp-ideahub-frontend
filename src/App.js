import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import SideNavbar from './components/SideNavbar';
import { useSelector } from 'react-redux';
import NewEnquiry from './pages/NewEnquiry';
import NewJob from './pages/NewJob';
import Jobs from './pages/Jobs';
import Employees from './pages/Employees';
import Clients from './pages/Clients';
import Enquiries from './pages/Enquiries';
import NewBOM from './pages/NewBOM';
import NewJobSubTask from './pages/NewJobSubTask';
import NewEnquirySubTask from './pages/NewEnquirySubTask';
import BOMs from './pages/BOMs';
import UpdateJob from './pages/UpdateJob';
import UpdateEnquiry from './pages/UpdateEnquiry';
import UpdateEmployee from './pages/UpdateEmployee';
import Designs from './pages/Designs';
import Purchasings from './pages/Purchasings';
import Quotations from './pages/Quotations';
import NewManufacturing from './pages/NewManufacturing';
import DesignDashboardEnquiries from './pages/DesignDashboardEnquiries';
import NewDesign from './pages/NewDesign';
import ViewDesign from './pages/ViewDesign';
import QuotationDashboardEnquiries from './pages/QuotationDashboardEnquiries';
import NewQuotation from './pages/NewQuotation';
import UpdateManufacturing from './pages/UpdateManufacturing';
import QCDashboardJobs from './pages/QCDashboardJobs';
import NewQC from './pages/NewQC';
import NewInstallation from './pages/NewInstallation';
import Stores from './pages/Stores';
import NewStoreItem from './pages/NewStoreItem';
import NewInventoryItemRequest from './pages/NewInventoryRequest';
import UpdateStoreItem from './pages/UpdateStoreItem';
import QCs from './pages/QCs';
import ManufacturingDashboardJobs from './pages/ManufacturingDashboardJobs';
import Laborers from './pages/Laborers';
import UpdatePurchasing from './pages/UpdatePurchasing';
import ViewQC from './pages/ViewQC';
import Labourers from './pages/Labourers';
import NewQSCosting from './pages/NewQSCosting';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div className="container">
          {user ? (
            <>
              <Header />
              <SideNavbar />
            </>
          ) : (
            <></>
          )}
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
            <Route path="/tickets" element={<PrivateRoute />}>
              <Route path="/tickets" element={<Tickets />} />
            </Route>
            <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
              <Route path="/ticket/:ticketId" element={<Ticket />} />
            </Route>
            <Route path="/new-enquiry" element={<PrivateRoute />}>
              <Route path="/new-enquiry" element={<NewEnquiry />} />
            </Route>
            <Route path="/new-job" element={<PrivateRoute />}>
              <Route path="/new-job" element={<NewJob />} />
            </Route>
            <Route path="/jobs" element={<PrivateRoute />}>
              <Route path="/jobs" element={<Jobs />} />
            </Route>
            <Route path="/employees" element={<PrivateRoute />}>
              <Route path="/employees" element={<Employees />} />
            </Route>
            <Route path="/clients" element={<PrivateRoute />}>
              <Route path="/clients" element={<Clients />} />
            </Route>
            <Route path="/enquiries" element={<PrivateRoute />}>
              <Route path="/enquiries" element={<Enquiries />} />
            </Route>
            <Route path="/new-bom" element={<PrivateRoute />}>
              <Route path="/new-bom" element={<NewBOM />} />
            </Route>
            <Route path="/boms" element={<PrivateRoute />}>
              <Route path="/boms" element={<BOMs />} />
            </Route>
            <Route path="/job/:jobId/add-subtask-enquiry" element={<PrivateRoute />}>
              <Route path="/job/:jobId/add-subtask-enquiry" element={<NewEnquirySubTask />} />
            </Route>
            <Route path="/job/:jobId/add-subtask" element={<PrivateRoute />}>
              <Route path="/job/:jobId/add-subtask" element={<NewJobSubTask />} />
            </Route>
            <Route path="/job/:jobId/edit" element={<PrivateRoute />}>
              <Route path="/job/:jobId/edit" element={<UpdateJob />} />
            </Route>
            <Route path="/enquiry/:enquiryId/edit" element={<PrivateRoute />}>
              <Route path="/enquiry/:enquiryId/edit" element={<UpdateEnquiry />} />
            </Route>
            <Route path="/employee/:employeeId/edit" element={<PrivateRoute />}>
              <Route path="/employee/:employeeId/edit" element={<UpdateEmployee />} />
            </Route>
            <Route path="/designs" element={<PrivateRoute />}>
              <Route path="/designs" element={<Designs />} />
            </Route>
            <Route path="/purchasings" element={<PrivateRoute />}>
              <Route path="/purchasings" element={<Purchasings />} />
            </Route>
            <Route path="/quotations" element={<PrivateRoute />}>
              <Route path="/quotations" element={<Quotations />} />
            </Route>
            <Route path="/manufacturing" element={<PrivateRoute />}>
              <Route path="/manufacturing" element={<Jobs />} />
            </Route>
            <Route path="/laborers" element={<PrivateRoute />}>
              <Route path="/laborers" element={<Laborers />} />
            </Route>
            <Route path="/new-manufacturing" element={<PrivateRoute />}>
              <Route path="/new-manufacturing" element={<NewManufacturing />} />
            </Route>
            <Route path="/update-manufacturing" element={<PrivateRoute />}>
              <Route path="/update-manufacturing" element={<UpdateManufacturing />} />
            </Route>
            <Route path="/design-dashboard" element={<PrivateRoute />}>
              <Route path="/design-dashboard" element={<DesignDashboardEnquiries />} />
            </Route>
            <Route path="/new-design" element={<PrivateRoute />}>
              <Route path="/new-design" element={<NewDesign />} />
            </Route>
            <Route path="/design/:enquiryId/view" element={<PrivateRoute />}>
              <Route path="/design/:enquiryId/view" element={<ViewDesign />} />
            </Route>
            <Route path="/quotation-dashboard" element={<PrivateRoute />}>
              <Route path="/quotation-dashboard" element={<QuotationDashboardEnquiries />} />
            </Route>
            <Route path="/new-quotation" element={<PrivateRoute />}>
              <Route path="/new-quotation" element={<NewQuotation />} />
            </Route>
            <Route path="/qc-dashboard" element={<PrivateRoute />}>
              <Route path="/qc-dashboard" element={<QCDashboardJobs />} />
            </Route>
            <Route path="/new-qc" element={<PrivateRoute />}>
              <Route path="/new-qc" element={<NewQC />} />
            </Route>
            <Route path="/new-installation" element={<PrivateRoute />}>
              <Route path="/new-installation" element={<NewInstallation />} />
            </Route>
            <Route path="/jobs-view" element={<PrivateRoute />}>
              <Route path="/jobs-view" element={<Jobs />} />
            </Route>
            <Route path="/qcs" element={<PrivateRoute />}>
              <Route path="/qcs" element={<QCs />} />
            </Route>
            <Route path="/manufacturing-dashboard" element={<PrivateRoute />}>
              <Route path="/manufacturing-dashboard" element={<ManufacturingDashboardJobs />} />
            </Route>

            <Route path="/stores" element={<PrivateRoute />}>
              <Route path="/stores" element={<Stores />} />
            </Route>
            <Route path="/new-inventory-item" element={<PrivateRoute />}>
              <Route path="/new-inventory-item" element={<NewStoreItem />} />
            </Route>
            <Route path="/stores/:itemId/request" element={<PrivateRoute />}>
              <Route path="/stores/:itemId/request" element={<NewInventoryItemRequest />} />
            </Route>
            <Route path="/stores/:itemId/edit" element={<PrivateRoute />}>
              <Route path="/stores/:itemId/edit" element={<UpdateStoreItem />} />
            </Route>
            <Route path="/purchasings/:bomId/edit" element={<PrivateRoute />}>
              <Route path="/purchasings/:bomId/edit" element={<UpdatePurchasing />} />
            </Route>
            <Route path="/view-qc" element={<PrivateRoute />}>
              <Route path="/view-qc" element={<ViewQC />} />
            </Route>
            <Route path="/jobs-view-design" element={<PrivateRoute />}>
              <Route path="/jobs-view-design" element={<Jobs />} />
            </Route>
            <Route path="/quotations-bom" element={<PrivateRoute />}>
              <Route path="/quotations-bom" element={<Quotations />} />
            </Route>
            <Route path="/labourers" element={<PrivateRoute />}>
              <Route path="/labourers" element={<Labourers />} />
            </Route>
            <Route path="/new-qscosting/:quotationIndexNo" element={<PrivateRoute />}>
              <Route path="/new-qscosting/:quotationIndexNo" element={<NewQSCosting />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
