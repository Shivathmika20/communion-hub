import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Poppins }from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const poppins= Poppins({
  subsets:['latin'],
  variable:'--font-poppins',
  weight:['400','500','600','700'],

})

export const metadata: Metadata = {
  title: "Communion Hub",
  description: "An Event App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
     
      <body className={ poppins.variable} >
       
        
        {children} 
        
      </body>
    </html>
   
  );
}
