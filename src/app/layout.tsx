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
      <body className={inter.className}>
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800 leading-tight">
                Prova Online — Análise de Sistemas
              </h1>
              <p className="text-xs text-indigo-600 font-semibold">2INF ETPC</p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-gray-200/50 bg-white/60 backdrop-blur-sm mt-12">
          <div className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-gray-400 font-medium">
            ETPC — Escola Técnica © 2026
          </div>
        </footer>
      </body>
    </html>
  );
}
