import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Co steruje Twoim jedzeniem? — dr Zuzanna Przekop",
  description:
    "Odpowiedz na kilka krótkich pytań i sprawdź, co najbardziej wpływa na Twoje decyzje jedzeniowe.",
  authors: [{ name: "dr Zuzanna Przekop" }],
  openGraph: {
    title: "Co steruje Twoim jedzeniem?",
    description:
      "Krótka autodiagnoza — sprawdź, który mechanizm najbardziej wpływa na Twoje jedzenie.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // zapobiega nieoczekiwanemu zoom na iOS
  themeColor: "#FFFBF5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
