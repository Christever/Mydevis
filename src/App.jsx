import { router } from "@/router/routes";
import "@/styles/App.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" theme="colored" autoClose={1000} />
    </>
  );
}
