import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../services/auth/authSlice"; // logout action'ı unutma

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const dispatch = useDispatch();
  const { user, expireTime } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(user);
  const isTokenExpired = expireTime && Date.now() > expireTime;

  // Süresi dolmuşsa logout işlemi başlat
  if (isTokenExpired) {
    dispatch(logout());
  }

  if (!isLoggedIn || isTokenExpired) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
