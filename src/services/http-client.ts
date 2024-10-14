import axios from "axios";

const API_BASE_URL = 
// PROD
"http://localhost:8080/"

// DEV
// "https://totaltrack-101a535d76f8.herokuapp.com/"
;

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
      




// import axios from "axios";

// const API_BASE_URL =  "localhost:8080/";

// export const httpClient = axios.create({
//   baseURL: API_BASE_URL,
// });

// httpClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );
