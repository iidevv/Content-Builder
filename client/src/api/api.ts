import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const authAPI = {
  login(email: string, password: string) {
    return instance.post("/auth/login", {
      email,
      password,
      // recaptcha: recaptchaValue,
    });
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
