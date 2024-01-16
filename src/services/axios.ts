import axios from 'axios'
import { CONFIG_APP } from '../constants'

const instance = {
  baseURL: CONFIG_APP.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

export const noAuthInstace = axios.create(instance)

const authInstace = axios.create(instance)

authInstace.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const errorResponse = (error || {}).response || {}
    if (errorResponse.status === 403) {
      window.location.href = '/forbidden'
    }

    return Promise.reject(error)
  }
)

export const postAuth = (url: string, data: any, params?: any, headers?: any) => {
  return authInstace.request({
    url,
    method: 'POST',
    data,
    params,
    headers,
  })
}

export const getAuth = (url: string, params?: any, headers?: any) => {
  return authInstace.request({
    url,
    method: 'GET',
    params,
    headers,
  })
}

export const putAuth = (url: string, data: any, params?: any, headers?: any) => {
  return authInstace.request({
    url,
    method: 'PUT',
    params,
    data,
    headers,
  })
}

export const deleteAuth = (url: string, params?: any, headers?: any) => {
  return authInstace.request({
    url,
    method: 'DELETE',
    params,
    headers,
  })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  authInstace,
  noAuthInstace,
  postAuth,
  getAuth,
  putAuth,
  deleteAuth,
}
