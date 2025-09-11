import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

function RequireAuth() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RequireAuth;
