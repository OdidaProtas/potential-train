import axios from "axios";

// const endpoint = "https://kura-backend.herokuapp.com";
const endpoint = "https://quiet-waters-43879.herokuapp.com/";

const axiosInstance = axios.create({
  baseURL: endpoint,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const userToken = localStorage.getItem("userToken");
//     if (userToken) {
//       config.headers.common["access_token"] = JSON.parse(userToken);
//     }

//     return config;
//   },
//   (error) => {
//     console.log(error);
//   }
// );

export default axiosInstance;
