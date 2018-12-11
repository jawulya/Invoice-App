import { connect } from "react-redux";
import Cart from "./Cart";
import { bindActionCreators } from "redux";
import * as invoicesActions from "../../pages/Invoices/invoicesActions";

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(invoicesActions, dispatch)
});

const mapStateToProps = ({ invoice }) => {
  return {
    invoice_items: invoice.invoice_items,
    products: invoice.products,
    activeCustomer: invoice.activeCustomer,
    totalCount: invoice.invoice_items
      .map(item => item.quantity)
      .reduce((a, b) => a + b, 0)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
