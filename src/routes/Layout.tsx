import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Outlet, useNavigation, useLocation, Link } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuIcon } from "lucide-react";

const queryClient = new QueryClient();

const navItems = [
  { path: "/", label: "Frames" },
  { path: "/search-result", label: "Search Results" },
];

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
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-14 items-center px-4">
          <Sheet>
            <SheetTrigger asChild className="bg-background">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.path}>
                    <Link
                      to={item.path}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                        location.pathname === item.path
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <span className="ml-4 font-semibold">Photo Booth Admin</span>
        </div>
      </header>
      <main key={location.pathname}>
        <Outlet />
      </main>
      <Toaster />
    </QueryClientProvider>
  );
};
