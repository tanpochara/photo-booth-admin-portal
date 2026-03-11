import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./Layout";
import { HomePage } from "@/Pages/Home";
import { FrameDetailPage } from "@/Pages/FrameDetailPage";
import { SearchResultPage } from "@/Pages/SearchResultPage";
import { CouponListPage } from "@/Pages/CouponListPage";
import { MerchantListPage } from "@/Pages/MerchantListPage";
import { MerchantDetailPage } from "@/Pages/MerchantDetailPage";

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
      {
        path: "/coupons",
        element: <CouponListPage />,
      },
      {
        path: "/merchants",
        element: <MerchantListPage />,
      },
      {
        path: "/merchants/:merchantId",
        element: <MerchantDetailPage />,
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