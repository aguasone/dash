import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_LOGS,
  FETCH_VISITORS,
  UPLOAD_DOCUMENT_FAIL,
  UPLOAD_DOCUMENT_SUCCESS,
  CUSTOMER_ADD_FAIL,
  CUSTOMER_ADD_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_UPDATE_SUCCESS,
  VISITOR_DELETE_SUCCESS,
  VISITOR_DELETE_FAIL,
  MAKE_PHOTO_SUCCESS,
  MAKE_PHOTO_FAIL,
  RESET_ADD_FORM,
  STATS,
  FETCH_CUSTOMERS,
  FETCH_CUSTOMER
} from "../actions/types";

export default function(
  state = {
    customers: [],
    customer_add: "none",
    customer_update: "none",
    visitor_delete: "none",
    photo_make: "none",
    photo_upload: "none",
    stats: ["0", "0"]
  },
  action
) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: "", authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_LOGS:
      return { ...state, logs: action.payload };
    case FETCH_VISITORS:
      return { ...state, visitors: action.payload };
    case CUSTOMER_ADD_SUCCESS:
      return { ...state, customer_add: action.payload };
    case CUSTOMER_ADD_FAIL:
      return { ...state, customer_add: action.payload };
    case CUSTOMER_UPDATE_SUCCESS:
      return { ...state, customer_update: action.payload };
    case CUSTOMER_UPDATE_FAIL:
      return { ...state, customer_update: action.payload };
    case VISITOR_DELETE_SUCCESS:
      return { ...state, visitor_delete: action.payload };
    case VISITOR_DELETE_FAIL:
      return { ...state, visitor_delete: action.payload };
    case MAKE_PHOTO_SUCCESS:
      return { ...state, photo_make: action.payload };
    case MAKE_PHOTO_FAIL:
      return { ...state, photo_make: action.payload };
    case UPLOAD_DOCUMENT_SUCCESS:
      return { ...state, photo_upload: action.payload };
    case UPLOAD_DOCUMENT_FAIL:
      return { ...state, photo_upload: action.payload };
    case RESET_ADD_FORM:
      return {
        ...state,
        visitor_add: "none",
        photo_make: "none",
        photo_upload: "none"
      };
    case STATS:
      return { ...state, stats: action.payload };
    case FETCH_CUSTOMERS:
      return { ...state, customers: action.payload };
    case FETCH_CUSTOMER: {
      const faces = state.customers.map((item, index) => {
        if (item.customer) {
          if (item.customer.id === action.payload.customer.id) {
            item.customer = action.payload.customer;
            return item;
          }
        }
        return item;
      });
      return { ...state, customers: faces };
    }
    default:
      return state;
  }
}
