
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, //ใช้งาน Meta ในการเข้าถึงแทน prosess.
});
console.log(import.meta.env.VITE_BACKEND_URL);

instance.interceptors.request.use((config) => {
  // config.method = 'DELETE'
  const accessToken = useAuthStore.getState().accessToken; //เรียก zustand ที่อยู่นอก stort
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


instance.interceptors.response.use(
  (response) => response,
  async  (error) => {
    const originalConfig = error.config;
    if (error.response.data.errcode === "INVALID_ACCESS_TOKEN" && !originalConfig._retry) {
      try {
        originalConfig._retry = true;
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          {withCredentials: true}
        );
        useAuthStore.getState().setAuth(res.data.user, res.data.access_token);
        originalConfig.headers.Authorization = `Bearer ${res.data.access_token}`
        return instance(originalConfig)
      } catch (err) {
        useAuthStore.getState().clearAuth()
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export { instance as axios };
