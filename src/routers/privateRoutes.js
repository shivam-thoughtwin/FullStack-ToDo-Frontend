import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/utils";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
