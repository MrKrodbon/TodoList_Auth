import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../redux/auth/selectors";
import type { RouteProps } from "../types";

const RestrictedRoute = ({ component, redirectTo = "/todos" }: RouteProps) => {
  const isLoggedIn = useSelector(selectIsUserLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : component;
};

export default RestrictedRoute;
