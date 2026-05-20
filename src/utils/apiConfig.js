const LOCAL_API_URL = import.meta.env.VITE_LOCAL_API_URL || "http://localhost:5000";
const PRODUCTION_API_URL =
  import.meta.env.VITE_PRODUCTION_API_URL ||
  import.meta.env.VITE_API_URL ||
  "https://khan-traders-api.onrender.com";

export const API_BASE_URL = import.meta.env.DEV ? LOCAL_API_URL : PRODUCTION_API_URL;

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
