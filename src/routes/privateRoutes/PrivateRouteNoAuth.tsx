import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAccessToken } from "../../hooks/authHooks";
import { Props } from "./PrivateRoute.types";
import { paths } from "../../core/constants/path";

export const PrivateRouteNoAuth: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const isAuthenticated = useAccessToken();
  if (isAuthenticated) {
    return <Navigate to={paths.DASHBOARD} />;
  }
  return <RouteComponent />;
};
