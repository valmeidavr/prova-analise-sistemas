"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, FileText, Star, ArrowRight, Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", email: "", turma: "2INF" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";
    if (!form.email.trim()) errs.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Email inválido";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/submit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (data.alreadyDone) {
        setApiError("Você já realizou esta prova. Não é possível refazer.");
        setLoading(false);
        return;
      }
    } catch {
      // If check fails, let them proceed
    }

    sessionStorage.setItem("aluno", JSON.stringify(form));
    router.push("/prova");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100/80 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 px-8 py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-white text-xl font-bold">Prova Online</h2>
              <p className="text-blue-100 text-sm mt-1">Análise de Sistemas — 2INF ETPC</p>
              <div className="mt-4 flex justify-center gap-4 text-blue-100 text-xs">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> 20 questões
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" /> Vale 5 pontos
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Sem limite
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                <p className="text-red-700 text-sm font-medium">{apiError}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                value={form.nome}
                onChange={(e) => {
                  setForm({ ...form, nome: e.target.value });
                  setErrors({ ...errors, nome: "" });
                }}
                className={`w-full px-4 py-3 rounded-xl border text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all ${
                  errors.nome ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50"
                }`}
              />
              {errors.nome && (
                <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="Ex: joao@email.com"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                  setApiError("");
                }}
                className={`w-full px-4 py-3 rounded-xl border text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all ${
                  errors.email ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-indigo-400 disabled:to-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  Iniciar Prova
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Temas */}
        <div className="mt-5 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/80 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Temas abordados</p>
          <div className="flex flex-wrap gap-2">
            {[
              { nome: "NeonDB", cor: "bg-purple-50 text-purple-600 border-purple-100" },
              { nome: "Diagrama de Caso de Uso", cor: "bg-orange-50 text-orange-600 border-orange-100" },
              { nome: "Query Básica SQL", cor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
              { nome: "Relacionamento de Tabelas", cor: "bg-blue-50 text-blue-600 border-blue-100" },
              { nome: "Diagrama de Classes", cor: "bg-pink-50 text-pink-600 border-pink-100" },
            ].map((tema) => (
              <span key={tema.nome} className={`${tema.cor} text-xs font-medium px-3 py-1.5 rounded-lg border`}>
                {tema.nome}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
