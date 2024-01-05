import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProtectedForUMRoutes = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/vendor-dashboard");
    }
  },[]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedForUMRoutes;
