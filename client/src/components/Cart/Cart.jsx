import React from "react";
import "./Cart.sass";

const Cart = ({
  products,
  invoice_items,
  updateDiscount,
  updateQuantity,
  totalCount,
  activeCustomer,
  deleteInvoiceItem
}) => {
  const handleAddDiscount = e => {
    updateDiscount(+e.target.value, activeCustomer);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {invoice_items.map(item => (
            <tr key={item.id}>
              <th scope="row">
                {products.data[item.product_id] &&
                  products.data[item.product_id].name}
              </th>
              <td>
                {products.data[item.product_id] &&
                  products.data[item.product_id].price}{" "}
                $
              </td>
              <td>{item.quantity}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    item.quantity &&
                    updateQuantity(
                      item.invoice_id,
                      item.id,
                      item.quantity,
                      activeCustomer.total,
                      products.data[item.product_id].price,
                      true
                    )
                  }
                >
                  -
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    updateQuantity(
                      item.invoice_id,
                      item.id,
                      item.quantity,
                      activeCustomer.total,
                      products.data[item.product_id].price
                    )
                  }
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    deleteInvoiceItem(
                      item.invoice_id,
                      item.id,
                      item.quantity,
                      activeCustomer.total,
                      products.data[item.product_id].price
                    )
                  }
                >
                  х
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-group">
        <label>Discount</label>
        <input
          value={activeCustomer.discount}
          type="number"
          className="form-control"
          placeholder="Enter discount"
          onChange={handleAddDiscount}
        />

        <small className="form-text text-muted">
          Enter your discount. If your discount 5% you must enter 5
        </small>
      </div>
      <div className="input-group">
        <div className="input-group-append">
          <p>Invoice total count</p>
          <strong>{totalCount}</strong>
        </div>
      </div>
      <div className="input-group">
        <div className="input-group-append">
          <p>Your total discount</p>
          <strong>{activeCustomer.discount} %</strong>
        </div>
      </div>
      <div className="input-group">
        <div className="input-group-append">
          <p>Invoice total</p>
          <strong>
            {activeCustomer.total && activeCustomer.total.toFixed(2)} $
          </strong>
        </div>
      </div>
      <div className="input-group">
        <div className="input-group-append">
          <p>Invoice total with discount</p>
          <strong>
            {(
              activeCustomer.total &&
              activeCustomer.total -
                (activeCustomer.total * activeCustomer.discount) / 100
            ).toFixed(2)}{" "}
            $
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Cart;
