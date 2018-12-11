import { normalize, schema } from "normalizr";

import {
  GET_ALL_INVOICES_SUCCESS,
  GET_ALL_INVOICES_REQUEST,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_INVOICE_SUCCESS,
  CREATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_UQANTITY_SUCESS,
  DELETE_INVOICE_ITEM_SUCESS
} from "../../constants/action.constans";

import axios from "axios";
const productsSchema = new schema.Entity("products");
const customersSchema = new schema.Entity("customers");
const invoicesSchema = new schema.Entity("invoices");
const productListSchema = [productsSchema];
const customerListSchema = [customersSchema];
const invoiceListSchema = [invoicesSchema];

export const getAllInvoicesCustomersProducts = () => dispatch => {
  dispatch({ type: GET_ALL_INVOICES_REQUEST });
  dispatch({ type: GET_ALL_CUSTOMERS_REQUEST });
  dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
  axios.get("http://localhost:8000/api/invoices").then(invoices => {
    dispatch({
      type: GET_ALL_INVOICES_SUCCESS,
      payload: normalize(invoices.data, invoiceListSchema)
    });
  });
  axios.get("http://localhost:8000/api/customers").then(customers => {
    dispatch({
      type: GET_ALL_CUSTOMERS_SUCCESS,
      payload: normalize(customers.data, customerListSchema)
    });
  });
  axios.get("http://localhost:8000/api/products").then(products => {
    dispatch({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: normalize(products.data, productListSchema)
    });
  });
};

export const setActiveCustomer = id => dispatch => {
  dispatch({ type: "CREATE_INVOICE_REQUEST" });
  let invoice = { customer_id: id, discount: 0, total: 0 };
  axios.post("http://localhost:8000/api/invoices", invoice).then(invoice => {
    dispatch({ type: CREATE_INVOICE_SUCCESS, payload: invoice.data });
  });
};

export const addProduct = (
  product_id,
  invoice_id,
  price,
  total
) => dispatch => {
  dispatch({
    type: "ADD_PRODUCT_REQUEST",
    product_id,
    invoice_id,
    price,
    total
  });
  axios
    .post(`http://localhost:8000/api/invoices/${invoice_id}/items`, {
      product_id,
      quantity: 1
    })
    .then(invoice_item => {
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: invoice_item.data });
    });
  axios
    .put(`http://localhost:8000/api/invoices/${invoice_id}`, {
      total: total + price
    })
    .then(invoice => {
      dispatch({ type: UPDATE_INVOICE_SUCCESS, payload: invoice.data });
    });
};

export const updateQuantity = (
  invoice_id,
  invItemId,
  quantity,
  oldTotal,
  price,
  isMinus
) => dispatch => {
  dispatch({ type: "UPDATE_QUANTITY_REQUEST" });
  axios
    .put(
      `http://localhost:8000/api/invoices/${invoice_id}/items/${invItemId}`,
      { quantity: isMinus ? --quantity : ++quantity }
    )
    .then(invoiceItem => {
      dispatch({ type: UPDATE_UQANTITY_SUCESS, payload: invoiceItem.data });
    });

  axios
    .put(`http://localhost:8000/api/invoices/${invoice_id}`, {
      total: isMinus ? oldTotal - price : oldTotal + price
    })
    .then(invoice => {
      dispatch({ type: UPDATE_INVOICE_SUCCESS, payload: invoice.data });
    });
};

export const removeInvoice = id => dispatch => {
  dispatch({ type: "REMOVE_INVOICE_REQUEST", id });
  axios.delete(`http://localhost:8000/api/invoices/${id}`).then(invoice => {
    dispatch({ type: DELETE_INVOICE_SUCCESS, payload: invoice.data });
  });
};
export const updateDiscount = (discount, customer) => dispatch => {
  dispatch({ type: "UPDATE_DISCOUNT_REQUEST" });
  axios
    .put(`http://localhost:8000/api/invoices/${customer.invId}`, {
      discount
    })
    .then(invoice => {
      dispatch({ type: UPDATE_INVOICE_SUCCESS, payload: invoice.data });
    });
};

export const deleteInvoiceItem = (
  invoice_id,
  invItemId,
  quantity,
  oldTotal,
  price
) => dispatch => {
  dispatch({
    type: "DELETE_INVOICE_ITEM_REQUEST",
    payload: invoice_id,
    invItemId
  });
  axios
    .delete(
      `http://localhost:8000/api/invoices/${invoice_id}/items/${invItemId}`
    )
    .then(invoiceItem => {
      dispatch({ type: DELETE_INVOICE_ITEM_SUCESS, payload: invoiceItem.data });
    });
  axios
    .put(`http://localhost:8000/api/invoices/${invoice_id}`, {
      total: oldTotal - quantity * price
    })
    .then(invoice => {
      dispatch({ type: UPDATE_INVOICE_SUCCESS, payload: invoice.data });
    });
};
