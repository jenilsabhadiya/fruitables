import axios from "axios";
import { BASE_URL } from "../src/constant/url";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.request && error.request.status === 401) {
      await axios.post(
        `${BASE_URL}/users/generateNewTokens`,
        {},
        { withCredentials: true }
      );
      return axiosInstance(error.config);
    }

    return Promise.reject(error);
  }
);
