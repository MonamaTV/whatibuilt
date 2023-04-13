import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AdminLayout from "@/components/Layout/AdminLayout";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
  const routes = ["/admin", "/admin/socials", "/admin/integrations"];
  const isAdmin = routes.includes(appProps.router.pathname);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem={true} attribute="class">
          {isAdmin ? (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
