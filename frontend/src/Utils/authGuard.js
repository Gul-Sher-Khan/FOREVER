// authGuard.ts
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "./authService";

export function AuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const role = authService.getRole();
  const publicPaths = ["/", "/login", "/signup"];

  React.useEffect(() => {
    // Handle public routes
    if (publicPaths.includes(location.pathname)) {
      if (isAuthenticated && location.pathname === "/login") {
        navigateByRole(role, navigate);
      }
      return;
    }

    // Handle protected routes
    if (!isAuthenticated) {
      navigate("/");
    } else if (!isRouteAllowed(location.pathname, role)) {
      navigateByRole(role, navigate);
    }
  }, [isAuthenticated, location, role, navigate]);

  return null;
}

export function navigateByRole(role, navigate) {
  switch (role) {
    case "vendor":
      navigate("/vendor");
      break;
    case "admin":
      navigate("/admin");
      break;
    case "user":
      navigate("/user/collection");
      break;
    default:
      navigate("/login");
  }
}

function isRouteAllowed(pathname, role) {
  if (!role) return false;
  return pathname.startsWith(`/${role.toLowerCase()}`);
}
