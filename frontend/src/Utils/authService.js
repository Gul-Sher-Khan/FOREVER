import axiosInstance from "./axiosInstance";

const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },

  signup: async (data) => {
    const response = await axiosInstance.post("/auth/signup", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    }
    return response.data;
  },

  updateProfile: async (data) => {
    return axiosInstance.put("/user/profile", data);
  },

  isAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },

  getRole: () => {
    return localStorage.getItem("role");
  },
};

export default authService;
