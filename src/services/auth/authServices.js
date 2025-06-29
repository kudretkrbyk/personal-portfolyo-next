import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const isBrowser = typeof window !== "undefined";

const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  if (response.data && isBrowser) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data && isBrowser) {
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
  if (isBrowser) {
    localStorage.removeItem("user");
    localStorage.removeItem("expireTime");
  }
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
