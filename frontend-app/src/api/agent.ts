import axios, { AxiosError, AxiosResponse } from "axios";
import { GISRoute } from "../components/map/models/GISRoute";

axios.defaults.baseURL = "http://localhost:7000/";

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        break;
      case 401:
        break;
      case 404:
        break;
      case 500:
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const GISRoutes = {
  details: (id: number) => requests.get<GISRoute>(`/get/${id}`),
};

const agent = { GISRoutes };

export default agent;
