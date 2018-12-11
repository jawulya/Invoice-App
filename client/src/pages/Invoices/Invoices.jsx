import React, { Component } from "react";
import "./invoices.sass";
import { connect } from "react-redux";
import * as formActions from "../../components/Form/formActions";
import * as invoicesActions from "./invoicesActions";
import { bindActionCreators } from "redux";
import Form from "../../components/Form";

class Invoices extends Component {
  componentWillMount() {
    this.props.getAllInvoicesCustomersProducts();
  }

  render() {
    const { openForm, invoices, customers, removeInvoice } = this.props;

    return (
      <div className="invoices container">
        <button type="button" className="btn btn-primary" onClick={openForm}>
          add invoice
        </button>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Customer</th>
              <th scope="col">Discount</th>
              <th scope="col">Total</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              invoices.map(invoice => (
                <tr key={invoice.id}>
                  <th scope="row">{invoice.id}</th>
                  <td>
                    {customers[invoice.customer_id] &&
                      customers[invoice.customer_id].name}
                  </td>
                  <td>{invoice.discount} %</td>
                  <td>
                    {invoice.total &&
                      (
                        invoice.total -
                        (invoice.total * invoice.discount) / 100
                      ).toFixed(2)}{" "}
                    $
                  </td>
                  <td>
                    <button
                      className="btn btn-danger delete"
                      onClick={() => removeInvoice(invoice.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Form />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(invoicesActions, dispatch)
});

const mapStateToProps = ({ invoice }) => {
  return {
    invoices: invoice.invoices.ids.map(id => invoice.invoices.data[id]),
    customers: invoice.customers.data
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoices);
