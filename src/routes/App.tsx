import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./Layout";
import { HomePage } from "@/Pages/Home";
import { FrameDetailPage } from "@/Pages/FrameDetailPage";
import { SearchResultPage } from "@/Pages/SearchResultPage";

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
      {
        path: "/search-result",
        element: <SearchResultPage />,
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