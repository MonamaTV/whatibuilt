import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import AdminLayout from "./admin/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
  const routes = ["/admin", "/admin/socials", "/admin/integrations"];
  if (routes.includes(appProps.router.pathname)) {
    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
          <Toaster position="top-center" reverseOrder={false} />
        </QueryClientProvider>
      </SessionProvider>
    );
  }

  return <Component {...pageProps} />;
}
