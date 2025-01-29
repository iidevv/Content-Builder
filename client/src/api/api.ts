import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const templatesAPI = {
  getTemplates(page, search) {
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
