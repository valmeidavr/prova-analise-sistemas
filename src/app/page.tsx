"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", email: "", turma: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";
    if (!form.email.trim()) errs.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Email inválido";
    if (!form.turma.trim()) errs.turma = "Turma é obrigatória";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    sessionStorage.setItem("aluno", JSON.stringify(form));
    router.push("/prova");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header do card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-center">
            <div className="text-5xl mb-3">🎓</div>
            <h2 className="text-white text-xl font-bold">Prova Online</h2>
            <p className="text-blue-100 text-sm mt-1">Análise de Sistemas — 2INF ETPC</p>
            <div className="mt-4 flex justify-center gap-4 text-blue-100 text-xs">
              <span className="flex items-center gap-1">
                <span>📝</span> 20 questões
              </span>
              <span className="flex items-center gap-1">
                <span>⭐</span> Vale 5 pontos
              </span>
              <span className="flex items-center gap-1">
                <span>⏱️</span> Sem limite de tempo
              </span>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                className={`w-full px-4 py-3 rounded-lg border text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.nome ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                }`}
              />
              {errors.nome && (
                <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Ex: joao@email.com"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                }}
                className={`w-full px-4 py-3 rounded-lg border text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Turma
              </label>
              <input
                type="text"
                placeholder="Ex: 2INF"
                value={form.turma}
                onChange={(e) => {
                  setForm({ ...form, turma: e.target.value });
                  setErrors({ ...errors, turma: "" });
                }}
                className={`w-full px-4 py-3 rounded-lg border text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.turma ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                }`}
              />
              {errors.turma && (
                <p className="text-red-500 text-xs mt-1">{errors.turma}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Carregando...
                </>
              ) : (
                <>Iniciar Prova →</>
              )}
            </button>
          </form>
        </div>

        {/* Info temas */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Temas abordados</p>
          <div className="flex flex-wrap gap-2">
            {["NeonDB", "Diagrama de Caso de Uso", "Query Básica SQL", "Relacionamento de Tabelas", "Diagrama de Classes"].map((tema) => (
              <span key={tema} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100">
                {tema}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
