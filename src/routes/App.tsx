import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./Layout";
import { HomePage } from "@/Pages/Home";
import { FrameDetailPage } from "@/Pages/FrameDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/frame/:frameId",
        element: <FrameDetailPage />,
      },
    ],
  },
]);

const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default App;