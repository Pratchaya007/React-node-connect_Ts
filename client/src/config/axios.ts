import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL//ใช้งาน Meta ในการเข้าถึงแทน prosess.
});
console.log(import.meta.env.VITE_BACKEND_URL);

export { instance as axios };