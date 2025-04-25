import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>HOME PAGE</Layout>}></Route>
      <Route
        path="/user-profile"
        element={<span>User Profile Page</span>}></Route>
      <Route path="/login" element={<span>Login Page</span>}></Route>
      <Route path="/signup" element={<span>Sign Up Page</span>}></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default AppRoutes;
