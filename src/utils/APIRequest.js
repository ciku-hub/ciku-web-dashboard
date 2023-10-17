// APIRequest.js
import axios from "axios";

// Define your base API URL here.
const baseURL = process.env.REACT_APP_BASE_URL; 

// Function to set common headers for API requests.
const setHeaders = (bearerToken) => {
  const headers = {
    Accept: "application/json",
    "App-Key": "ciku_app_key_b8f87c3f2d6946ee80b3c6b057af88a5", 
  };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  }
  return headers;
};

// Function to handle API GET requests with or without a Bearer token.
export const getRequest = async (url, bearerToken = null) => {
  try {
    const response = await axios.get(`${baseURL}${url}`, {
      headers: setHeaders(bearerToken),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle API POST requests with or without a Bearer token.
export const postRequest = async (url, data, bearerToken = null) => {
  try {
    const response = await axios.post(`${baseURL}${url}`, data, {
      headers: setHeaders(bearerToken),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle API PUT requests with or without a Bearer token.
export const putRequest = async (url, data, bearerToken = null) => {
  try {
    const response = await axios.put(`${baseURL}${url}`, data, {
      headers: setHeaders(bearerToken),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle API PATCH requests with or without a Bearer token.
export const patchRequest = async (url, data, bearerToken = null) => {
  try {
    const response = await axios.patch(`${baseURL}${url}`, data, {
      headers: setHeaders(bearerToken),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle API DELETE requests with or without a Bearer token.
export const deleteRequest = async (url, bearerToken = null) => {
  try {
    const response = await axios.delete(`${baseURL}${url}`, {
      headers: setHeaders(bearerToken),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
