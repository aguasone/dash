import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_LOGS,
  FETCH_VISITORS,
  CUSTOMER_ADD_FAIL,
  CUSTOMER_ADD_SUCCESS,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_UPDATE_SUCCESS,
  VISITOR_ADD_SUCCESS,
  VISITOR_ADD_FAIL,
  VISITOR_UNKNOWN_ADD_SUCCESS,
  VISITOR_UNKNOWN_ADD_FAIL,
  VISITOR_UNKNOWN_UPDATE_SUCCESS,
  VISITOR_KNOWN_ADD_SUCCESS,
  VISITOR_KNOWN_ADD_FAIL,
  VISITOR_DELETE_SUCCESS,
  VISITOR_DELETE_FAIL,
  RESET_ADD_FORM,
  STATS,
  FETCH_CUSTOMERS,
  FETCH_CUSTOMER,
  FETCH_CAMERAS,

  CAMERA_UPDATE_SUCCESS,
  CAMERA_UPDATE_FAIL,
  CAMERA_DELETE_SUCCESS,
  CAMERA_DELETE_FAIL,
  CAMERA_ADD_SUCCESS,
  CAMERA_ADD_FAIL
} from "../actions/types";

export default function(
  state = {
    customers: [],
    visitors: [],
    cameras: [],
    customer_add: "none",
    camera_del: "none",
    customer_update: "none",
    visitor_add: "none",
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

    case FETCH_CAMERAS:
      return { ...state, cameras: action.payload };

    case FETCH_VISITORS:
      return { ...state, visitors: action.payload };

    case CAMERA_UPDATE_SUCCESS:
      let ucamarray = state.cameras || [];
      ucamarray[action.payload.index] = action.payload;
      return { ...state, cameras: ucamarray };
    case CAMERA_UPDATE_FAIL:
      return { ...state, camera_del: action.payload };

    case CAMERA_DELETE_SUCCESS:
      let camarray = state.cameras || [];
      camarray.pull(action.payload.id);
      return { ...state, cameras: camarray };
    case CAMERA_DELETE_FAIL:
      return { ...state, camera_del: action.payload };

    case CUSTOMER_ADD_SUCCESS:
      let parray = state.customers || [];
      parray.push(action.payload);
      return { ...state, customers: parray };
    case CUSTOMER_ADD_FAIL:
      return { ...state, customer_add: action.payload };

    case CUSTOMER_UPDATE_SUCCESS:
      let uarray = state.customers || [];
      uarray[action.payload.index] = action.payload;
      return { ...state, customers: uarray };
    case CUSTOMER_UPDATE_FAIL:
      return { ...state, customer_update: action.payload };

    case VISITOR_ADD_FAIL:
      return { ...state, visitor_add: action.payload };
    case VISITOR_ADD_SUCCESS:
      return { ...state, visitor_add: action.payload };

    case VISITOR_UNKNOWN_ADD_SUCCESS:
      let array = state.visitors || [];
      array.push(action.payload);
      return { ...state, visitors: array };
    case VISITOR_UNKNOWN_ADD_FAIL:
      return { ...state, visitor_add: action.payload };

    case VISITOR_UNKNOWN_UPDATE_SUCCESS:
        let varray = state.visitors || [];
        let prop = varray.map((prop,key) => {
          if (prop.name === action.payload.name)
            prop.name = action.payload.id
          return prop
        })
        return { ...state, visitors: prop };

    case VISITOR_KNOWN_ADD_SUCCESS:
      let carray = state.visitors || [];
      carray.push(action.payload);
      return { ...state, visitors: carray };
    case VISITOR_KNOWN_ADD_FAIL:
      return { ...state, visitor_add: action.payload };

    case VISITOR_DELETE_SUCCESS:
      return { ...state, visitor_delete: action.payload };
    case VISITOR_DELETE_FAIL:
      return { ...state, visitor_delete: action.payload };

    case RESET_ADD_FORM:
      return {
        ...state,
        photo_make: "none",
        photo_upload: "none"
      };
    case STATS:
      return { ...state, stats: action.payload };
    case FETCH_CUSTOMERS:
      return { ...state, customers: action.payload };
    case FETCH_CUSTOMER: {
      const face = state.customers.map((item, index) => {
        if (item.customer) {
          if (item.customer.id === action.payload.customer.id) {
            item.customer = action.payload.customer;
            return item;
          }
        }
        return item;
      });
      return { ...state, customer: face };
    }
    default:
      return state;
  }
}
