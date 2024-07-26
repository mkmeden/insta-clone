import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layout/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import "./App.css";
import useAuthStore from "./store/authStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";



function App() {

const [authUser , loading , error] = useAuthState(auth)

  return (
    <div>
      <PageLayout>
        <Routes>
          <Route path="/" element={ authUser? <HomePage /> : <Navigate to ='/auth' />} />
          <Route path="/auth" element={!authUser? <AuthPage /> :<Navigate to ='/' /> } />
          <Route path="/:username" element={<ProfilePage />} />
        </Routes>
      </PageLayout>
    </div>
  );
}

export default App;
