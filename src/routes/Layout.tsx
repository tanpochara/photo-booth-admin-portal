import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, useNavigation, useLocation } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export const Layout = () => {
  const { state } = useNavigation();
  const location = useLocation();

  if (state === "loading") {
    return (
      <>
        <div className="flex justify-center items-center w-full h-[80vh]">
          <Spinner />
        </div>
        <Toaster />
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
        <div key={location.pathname}>
          <Outlet />
        </div>
      <Toaster />
    </QueryClientProvider>
  );
};
