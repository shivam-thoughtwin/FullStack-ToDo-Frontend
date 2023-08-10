import Cookies from "js-cookie";
import JwtDecode from "jwt-decode";

export const isAuthenticated = () => {
  const token = Cookies.get("todoToken");
  if (!token) {
    return false;
  }
  const userInfo = JwtDecode(token);
  if (userInfo && !checkIsSessionExpired(userInfo?.exp)) {
    return true;
  }
  return false;
};

export const checkIsSessionExpired = (tokenExpiry = 0) => {
  const currentTime = new Date().getTime();
  const tokenExpireTime = new Date((tokenExpiry - 10) * 1000).getTime();
  if (currentTime > tokenExpireTime) {
    return true;
  } else {
    return false;
  }
};
