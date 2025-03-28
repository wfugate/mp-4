
import "./globals.css";
import React from "react";
import Header from "@/app/components/header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-amber-100 flex flex-col min-h-screen items-center">
        <Header/>
        {children}
      </body>
    </html>
  );
}
