
import { SET_PRODUCTS,ADD_PRODUCT,PRODUCT_FETCHED,PRODUCT_UPDATED,PRODUCT_DELETED} from './action-types/product-actions'

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export function productFetched(product) {
  return {
    type: PRODUCT_FETCHED,
    product
  }
}

export function productUpdated(product) {
  return {
    type: PRODUCT_UPDATED,
    product
  }
}

export function productDeleted(productId) {
  return {
    type: PRODUCT_DELETED,
    productId
  }
}

export function saveProduct(data) {
  return dispatch => {
    return fetch('/api/products', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addProduct(data.product)));
  }
}

export function updateProduct(data) {
  return dispatch => {
    return fetch(`/api/products/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(productUpdated(data.product)));
  }
}

export function deleteProduct(id) {
  return dispatch => {
    return fetch(`/api/products/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(productDeleted(id)));
  }
}

export function fetchProducts() {
  return dispatch => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => dispatch(setProducts(data.products)));
  }
}

export function fetchProduct(id) {
  return dispatch => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => dispatch(productFetched(data.product)));
  }
}
