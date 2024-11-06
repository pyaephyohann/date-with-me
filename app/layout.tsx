"use client";

import { Fredoka } from "next/font/google";
import { useRouter } from "next/navigation";
import "./globals.css";
import { useEffect, useState } from "react";
import InitializedLoadingPage from "@/components/InitializedLoadingPage";
import Metadata from "@/components/Metadata";
import Background from "@/components/Background";
import StoreProvider from "./StoreProvider";
import AppLayout from "./Layout/AppLayout";

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const handleUnload = () => {
  //     localStorage.removeItem("heartSecret");
  //   };

  //   window.addEventListener("beforeunload", handleUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //   };
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Trigger loading when navigating
    //@ts-ignore
    router.events?.on("routeChangeStart", handleStart);
    //@ts-ignore
    router.events?.on("routeChangeComplete", handleComplete);
    //@ts-ignore
    router.events?.on("routeChangeError", handleComplete);

    return () => {
      //@ts-ignore
      router.events?.off("routeChangeStart", handleStart);
      //@ts-ignore
      router.events?.off("routeChangeComplete", handleComplete);
      //@ts-ignore
      router.events?.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <StoreProvider>
      <html lang="en">
        <link rel="icon" href="/favicon.png" />
        <body className={fredoka.className}>
          <Metadata title="Date With Me" />
          <div>
            <Background />
            {isLoading ? (
              <InitializedLoadingPage />
            ) : (
              <AppLayout>{children}</AppLayout>
            )}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
