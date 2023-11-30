import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PageError from "../pages/PageError";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ChatSection from "../pages/auth/ChatSection";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: PageError,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/chats/:id",
    Component: ChatSection,
  },
]);
