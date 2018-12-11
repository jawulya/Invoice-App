import { connect } from "react-redux";
import Form from "./Form";
import { bindActionCreators } from "redux";
import * as formActions from "./formActions";
import * as invoicesActions from "../../pages/Invoices/invoicesActions";

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(invoicesActions, dispatch)
});

const mapStateToProps = ({ form, invoice }) => {
  return {
    open: form.open,
    invoices: invoice.invoices,
    customers: invoice.customers,
    products: invoice.products,
    activeCustomer: invoice.activeCustomer,
    total: invoice.invoice_items
      .map(item => invoice.products.data[item.product_id].price * item.quantity)
      .reduce((a, b) => {
        return a + b;
      }, 0)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
