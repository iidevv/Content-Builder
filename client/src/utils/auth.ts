import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const isAuthenticated = (): boolean => {
  const token = Cookies.get("token");

  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};
