import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AccountPage from "./pages/AccountPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import AddVenuePage from "./pages/AddVenuePage";
import EditVenuePage from "./pages/EditVenuePage";
import VenuePage from "./pages/VenuePage";
import ScrollToTop from "./components/ScrollToTop";
import "./global.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="notfound" element={<NotFoundPage />} />
          <Route path="profile/:name" element={<ProfilePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="add" element={<AddVenuePage />} />
          <Route path="edit/:id" element={<EditVenuePage />} />
          <Route path="venue/:id" element={<VenuePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
