import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppLoader from "@/components/AppLoader";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

export const metadata = {
  title: "CineVox — Decode Audience Sentiment",
  description: "Discover what audiences truly feel about any film, instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={jakarta.variable}
        style={{ fontFamily: "var(--font-display)" }}
      >
        <AppLoader>{children}</AppLoader>
      </body>
    </html>
  );
}
