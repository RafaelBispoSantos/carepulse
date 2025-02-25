// layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300","400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePulse",
  description: "Um sistema de gestão de saúde",
  other: {
    'format-detection': 'telephone=no, date=no, email=no, address=no'
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
        <ThemeProvider>
          {/* Script seguro para remover elementos de extensões */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var e=document.getElementById('extwaiokist');e&&e.remove()}catch(e){}})();`,
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}