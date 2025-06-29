import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data) {
      const expireTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("expireTime", expireTime);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expireTime");
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
