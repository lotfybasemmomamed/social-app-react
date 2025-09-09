import React from "react";
import AuthForm from "../../components/AuthForm";

function Login() {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <AuthForm type="login" btnText="Login" />
    </div>
  );
}

export default Login;
