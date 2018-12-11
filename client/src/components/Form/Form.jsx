import React, { Component } from "react";
import "./Form.sass";
import Cart from "../Cart";

class Form extends Component {
  handleChangeCustomer = event => {
    this.props.setActiveCustomer(+event.target.value);
  };
  handleAddProduct = e => {
    this.props.addProduct(
      +e.target.value,
      +this.props.activeCustomer.invId,
      this.props.products.data[e.target.value].price,
      this.props.total
    );
  };
  closeModal = () => {
    this.props.closeForm();
  };
  render() {
    const { open, customers, products } = this.props;

    return (
      <div
        className={
          open ? "form-wrapper open container" : "form-wrapper container"
        }
      >
        <div className="button__wrapper">
          <button onClick={this.closeModal} className="btn right">
            Close
          </button>
        </div>
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="form-group">
              <label>Select Customer</label>
              <select
                className="form-control"
                onChange={this.handleChangeCustomer}
              >
                <option defaultValue hidden key="keyCustomer">
                  Select Customer
                </option>
                {customers.ids.map(id => (
                  <option value={id} key={id}>
                    {customers.data[id] && customers.data[id].name}
                  </option>
                ))}
              </select>
              <label>Select Products</label>
              <select className="form-control" onChange={this.handleAddProduct}>
                <option defaultValue hidden key="key">
                  Select Product
                </option>
                {products.ids.map(id => (
                  <option value={id} key={id}>
                    {products.data[id] && products.data[id].name}
                  </option>
                ))}
              </select>
            </div>
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
