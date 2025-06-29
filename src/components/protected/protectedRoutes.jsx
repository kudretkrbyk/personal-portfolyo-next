"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../../services/auth/authSlice";

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, expireTime } = useSelector((state) => state.auth);

  const isLoggedIn = Boolean(user);
  const isTokenExpired = expireTime && Date.now() > expireTime;

  useEffect(() => {
    if (isTokenExpired) {
      dispatch(logout());
    }
    if (!isLoggedIn || isTokenExpired) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, isTokenExpired, dispatch, router, redirectTo]);

  if (!isLoggedIn || isTokenExpired) {
    return null;
  }

  return children;
}
