import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prova Online — Análise de Sistemas | 2INF ETPC",
  description: "Prova online de Análise de Sistemas para turma 2INF da ETPC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h1 className="text-base font-bold text-gray-800 leading-tight">
                Prova Online — Análise de Sistemas
              </h1>
              <p className="text-sm text-blue-600 font-medium">2INF ETPC</p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-white mt-12">
          <div className="max-w-4xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
            ETPC — Escola Técnica © 2026
          </div>
        </footer>
      </body>
    </html>
  );
}
