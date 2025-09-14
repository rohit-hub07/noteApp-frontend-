import { useEffect, useState } from "react";
import "./App.css";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import NoteDetail from "./page/NoteDetail";


function App() {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to={"/user/login"} />}
          />
        </Route>

        <Route
          path="/user/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/user/register"
          element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
        />

        <Route path="notes/:id" element={<NoteDetail />}/>

      </Routes>
    </div>
  );
}

export default App;
