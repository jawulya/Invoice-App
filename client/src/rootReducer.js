import { combineReducers } from "redux";
import form from "./components/Form/formReducer";
import invoice from "./pages/Invoices/invoicesReducer";

export default combineReducers({
  form,
  invoice
});
