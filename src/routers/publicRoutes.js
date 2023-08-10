import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/utils";

const PublicRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? <Navigate to="/" /> : <Component {...rest} />;
};

export default PublicRoute;
