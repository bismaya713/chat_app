import React from "react";
import { useAuth } from "./context/AuthProvider";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Signup from "./components/signup";
import Login from "./components/login";
import Logout from "./home/left-1/Logout";
import toast, { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { authUser, setAuthUser } = useAuth();
  console.log(authUser);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
     
    </>
  );
}

export default App;
