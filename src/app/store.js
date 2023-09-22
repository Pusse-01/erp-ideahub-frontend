import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';
import noteReducer from '../features/notes/noteSlice';
import enquiryReducer from '../features/enquiries/enquirySlice';
import jobReducer from '../features/jobs/jobSlice';
import BOMReducer from '../features/boms/BOMSlice';
import employeeReducer from '../features/employees/employeeSlice';
import taskReducer from '../features/tasks/taskSlice';
import productionReducer from '../features/productions/productionSlice';
import designReducer from '../features/designs/designSlice';
import azureReducer from '../features/azure/azureSlice';
import quotationReducer from '../features/quotations/quotationSlice';
import pdfReducer from '../features/pdf/pdfSlice';
import storesReducer from '../features/stores/storesSlice';
import installationReducer from '../features/installations/installationSlice';
import qcReducer from '../features/qcs/qcSlice';
import purchasingReducer from '../features/purchasing/purchasingSlice';
import notificationsReducer from '../features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    note: noteReducer,
    enquiry: enquiryReducer,
    job: jobReducer,
    BOM: BOMReducer,
    employee: employeeReducer,
    task: taskReducer,
    production: productionReducer,
    design: designReducer,
    azure: azureReducer,
    quotation: quotationReducer,
    pdf: pdfReducer,
    stores: storesReducer,
    installation: installationReducer,
    qc: qcReducer,
    purchasing: purchasingReducer,
    notification: notificationsReducer,
  },
});
