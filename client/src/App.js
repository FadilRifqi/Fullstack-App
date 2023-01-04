import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import EditProduct from "./pages/EditProduct";
import TambahProduct from "./pages/TambahProduct";
import EditProfile from "./pages/EditProfile";
import InboxPage from "./pages/InboxPage";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/inbox/chat/:id" element={<ChatRoom />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/products/add" element={<TambahProduct />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit/:id" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
