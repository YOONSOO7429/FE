import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../Components/Main";
import Test from "../Pages/DetailPage";
import LoginForm from "../Pages/LogIn";
import Posts from "../Pages/Posts";
import Register from "../Pages/Register";
import PostDetail from "../Pages/PostDetail";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/write" element={<Posts />} />
        <Route path="/LogIn" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path=":id" element={<Test />} />
        <Route path="/Posts/:postId" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
