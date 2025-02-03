import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const authAPI = {
  login(data = {}) {
    return instance.post("/auth/login", data);
  },
  register(data = {}) {
    return instance.post("/auth/register", data);
  },
};

export const templatesAPI = {
  getTemplates(page: number, search: string) {
    return instance
      .get(`/templates/`, {
        params: {
          page,
          search,
        },
      })
      .then((response) => {
        return response.data;
      });
  },
  addTemplate() {
    return instance.post(`/templates/`).then((response) => {
      return response.data;
    });
  },
};

export const templateAPI = {};
