import omit from "lodash/omit";
import {
  GET_ALL_INVOICES_SUCCESS,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_PRODUCTS_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  DELETE_INVOICE_SUCCESS,
  CREATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_UQANTITY_SUCESS,
  DELETE_INVOICE_ITEM_SUCESS
} from "../../constants/action.constans";

const initialState = {
  activeCustomer: {
    id: 0,
    invId: 0,
    discount: 0,
    total: 0
  },
  invoices: {
    data: {},
    ids: []
  },
  invoice_items: [],
  customers: {
    data: {},
    ids: []
  },
  products: {
    data: {},
    ids: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: {
          data: action.payload.entities.invoices,
          ids: action.payload.result
        }
      };
    case GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: {
          data: action.payload.entities.customers,
          ids: action.payload.result
        }
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          data: action.payload.entities.products,
          ids: action.payload.result
        }
      };
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          data: {
            ...state.invoices.data,
            [action.payload.id]: action.payload
          },
          ids: [...state.invoices.ids, action.payload.id]
        },
        activeCustomer: {
          id: action.payload.customer_id,
          invId: action.payload.id,
          discount: action.payload.discount,
          total: action.payload.total
        },
        invoice_items: []
      };
    case UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          data: {
            ...state.invoices.data,
            [action.payload.id]: action.payload
          },
          ids: [...state.invoices.ids]
        },
        activeCustomer: {
          id: action.payload.customer_id,
          invId: action.payload.id,
          discount: action.payload.discount,
          total: action.payload.total
        }
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        invoice_items: [...state.invoice_items, action.payload]
      };

    case UPDATE_UQANTITY_SUCESS:
      return {
        ...state,
        invoice_items: state.invoice_items.map(i => {
          return i.id === action.payload.id ? action.payload : i;
        })
      };
    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          data: omit(state.invoices.data, action.payload.id),
          ids: state.invoices.ids.filter(id => id !== action.payload.id)
        }
      };
    case DELETE_INVOICE_ITEM_SUCESS:
      return {
        ...state,
        invoice_items: state.invoice_items.filter(
          item => item.id !== action.payload.id
        )
      };

    default:
      return state;
  }
}
