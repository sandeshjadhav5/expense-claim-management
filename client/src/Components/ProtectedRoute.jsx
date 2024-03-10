import React, { useEffect } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const toast = useToast();

  const isAuth = localStorage.getItem("isAuth") === "true";
  useEffect(() => {}, [isAuth]);

  console.log("isAuth - - - > >", isAuth);
  if (!isAuth) {
    toast({
      title: `Please Login First`,
      position: "bottom-left",
      duration: 2000,
      variant: "subtle",
      isClosable: true,
    });

    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
