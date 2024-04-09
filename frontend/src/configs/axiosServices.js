import axios from "axios";
import { refreshToken } from "../apis/Login";
const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (
      error.response.errors === "Expired token" &&
      error.response.status === 401
    ) {
      try {
        const result = await refreshToken();
        const refresh_token = result.data.token;
        localStorage.setItem("refreshToken", refresh_token);
        originalConfig.headers["Authorization"] = `Bearer ${refresh_token}`;

        return instance(originalConfig);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }
    // Retry logic
    let retries = originalConfig.retry || 3;
    if (!error.response || error.code === 'ECONNABORTED' || error.code >= 500) {
      if (retries > 0) {
        console.log(`Retrying... Remaining retries: ${retries - 1}`);
        originalConfig.retry = retries - 1;
        return new Promise(resolve => {
          setTimeout(() => resolve(instance(originalConfig)), 3000);
        });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
