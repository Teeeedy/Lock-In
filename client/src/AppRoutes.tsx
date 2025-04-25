import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePages";
import { SignUpForm } from "./components/SignUpForm";
import { LogInForm } from "./components/LogInForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }></Route>
      <Route
        path="/user-profile"
        element={<span>User Profile Page</span>}></Route>
      <Route
        path="/signup"
        element={
          <Layout>
            <SignUpForm />
          </Layout>
        }></Route>
      <Route
        path="/login"
        element={
          <Layout>
            <LogInForm></LogInForm>
          </Layout>
        }></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default AppRoutes;
