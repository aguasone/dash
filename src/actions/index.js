import axios from 'axios';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_LOGS,
    FETCH_VISITORS,
    SOCKET_STATE,
    UPLOAD_DOCUMENT_SUCCESS,
    UPLOAD_DOCUMENT_FAIL,
    CUSTOMER_ADD_FAIL,
    CUSTOMER_ADD_SUCCESS,
    CUSTOMER_UPDATE_FAIL,
    CUSTOMER_UPDATE_SUCCESS,
    VISITOR_DELETE_FAIL,
    VISITOR_DELETE_SUCCESS,
    MAKE_PHOTO_FAIL,
    MAKE_PHOTO_SUCCESS,
    RESET_ADD_FORM,
    STATS,
    FETCH_CUSTOMERS,
    FETCH_CUSTOMER
} from './types.js';

const io = require('socket.io-client')
const socket = io('https://gitlab.exception34.com', {secure: true})

const ROOT_URL = 'https://gitlab.exception34.com/api';
const ROOT_URL2 = 'https://gitlab.exception34.com/apis';

export function signinUser({email, password}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(response => {
                // If request is good
                // - update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                // - save jwt token and id
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.id);
                // redirect to another route
              //  browserHistory.push('/');
            })
            .catch(() => {
                // If request bad
                // - show an error to the user
                dispatch(authError('Invalid email or password'));
            });

        // If request is successful
    }
}

export function signupUser({email, password}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.id);
             //   browserHistory.push('/');
            })
            .catch(response => {
                dispatch(authError(response.response.data.error));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}
export function loadStats(stats) {
    return {
        type: STATS,
        payload: stats 
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    return {type: UNAUTH_USER};
}

export function fetchLogs() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/logs`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_LOGS,
                    payload: response.data.logs
                });
            });
    }
}

export function fetchVisitors() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/visitors`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_VISITORS,
                    payload: response.data.visitors
                });
            });
    }
}

export function fetchCustomers() {
    return function (dispatch) {
        //axios.get(`${ROOT_URL2}/faces?filter[include]=photos&filter[where][photoId][neq]=&filter[order]=date%20DESC&filter[limit]=20`, {
        axios.get(`${ROOT_URL2}/faces?filter[include]=customer&filter[order]=date%20DESC&filter[limit]=20`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_CUSTOMERS,
                    payload: response.data
                });
            });
    }
}

export function fetchCustomer(id) {
    return function (dispatch) {
        //axios.get(`${ROOT_URL2}/faces?filter[include]=photos&filter[where][photoId][neq]=&filter[order]=date%20DESC&filter[limit]=20`, {
        axios.get(`${ROOT_URL2}/faces/${id}?filter[include]=customer`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_CUSTOMER,
                    payload: response.data
                });
            });
    }
}


export function addCustomer(size) {
console.log(size)
    return function (dispatch) {

      axios.post(`${ROOT_URL2}/customers`, size)
        .then((response) => {
          console.log('Response', response);
          dispatch({
              type: CUSTOMER_ADD_SUCCESS,
              payload: 'success'
          });
          socket.emit('new');
          console.log("Visitor added");
        }).catch(response => {
            dispatch({
                type: CUSTOMER_ADD_FAIL,
                payload: 'fail'
            });
            console.log("Can't add a visitor");
        });


    }
}

export function updateCustomer(size) {
    return function (dispatch) {

      axios.patch(`${ROOT_URL2}/customers/${size.customer.id}`, {
                      date:size.date,
                      firstname:size.customer.firstname,
                      lastname:size.customer.lastname,
                      email:size.customer.email,
                      age: size.customer.age,
                      photo: size.known
                     })
        .then((response) => {
          console.log('Response', response);
          dispatch({
              type: CUSTOMER_UPDATE_SUCCESS,
              payload: 'success'
          });
          socket.emit('update', size.id);
          //socket.emit('reload');
          console.log("Visitor added");
        }).catch(response => {
            dispatch({
                type: CUSTOMER_UPDATE_FAIL,
                payload: 'fail'
            });
            console.log("Can't add a visitor");
        });


    }
}

export function deleteVisitor(id) {
    return function (dispatch) {
        axios.delete(`${ROOT_URL}/delete/${id}`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: VISITOR_DELETE_SUCCESS,
                    payload: 'success'
                });
                console.log("Visitor deleted");
            })
            .catch(response => {
                dispatch({
                    type: VISITOR_DELETE_FAIL,
                    payload: 'fail'
                });
                console.log("Can't delete a visitor");
            });
    }
}

export function toogleAccess(id, value) {
    return function (dispatch) {
        axios.patch(`${ROOT_URL}/toogle/${id}/${value}`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                console.log("Access changed");
            })
            .catch(response => {
                console.log("Can't change access");
            });
    }
}

export function addSocketToState(ws) {
    return {
        type: SOCKET_STATE,
        payload: ws
    };
}

export function uploadDocument({file}, ws) {
    let data = new FormData();
    data.append('file', file);
    return (dispatch) => {
        axios.post(`${ROOT_URL}/photo`, data)
            .then(response => {
                // it causes error when it sends success msg first before sending request to websocket when it isn't connected
                // that's why I changed the order // by jun
                ws.send("photo_upload");
                dispatch({type: UPLOAD_DOCUMENT_SUCCESS, payload: 'success'});
			})
            .catch(error => dispatch({type: UPLOAD_DOCUMENT_FAIL, payload: 'fail'}));
    };
}

export function photoMake(result) {
    return function (dispatch) {
        if (result === 'success') {
            dispatch({
                type: MAKE_PHOTO_SUCCESS,
                payload: 'success'
            });
            console.log('Photo make success');
        } else if (result === 'fail') {
            dispatch({
                type: MAKE_PHOTO_FAIL,
                payload: 'fail'
            });
            console.log('Photo make fail');
        }
    };
}

export function resetAddForm() {
    return function (dispatch) {
        dispatch({
            type: RESET_ADD_FORM,
            payload: 'reset'
        });
        console.log('Form reset');
    };

}
