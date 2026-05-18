import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionGuard from "@/components/shared/SessionGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocAppoint",
  description: "Book your doctor appointments with ease. DocAppoint is your go-to platform for finding and scheduling appointments with healthcare professionals. Experience seamless booking, personalized recommendations, and reliable reminders—all in one place. Your health, our priority.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                <SessionGuard />
                <Toaster />
            </body>
        </html>
    );
}
