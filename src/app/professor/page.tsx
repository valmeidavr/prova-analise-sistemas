"use client";

import { useState } from "react";
import { Lock, Trophy, Medal, Award, Users, TrendingUp, BarChart3, Loader2, LogOut } from "lucide-react";

interface Result {
  nome: string;
  email: string;
  turma: string;
  acertos: number;
  nota: number;
  created_at: string;
}

function getRankIcon(index: number) {
  if (index === 0) return <Trophy className="w-5 h-5 text-yellow-500" />;
  if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
  if (index === 2) return <Award className="w-5 h-5 text-amber-600" />;
  return <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-400">{index + 1}</span>;
}

function getNotaBadge(nota: number) {
  if (nota >= 3.5) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (nota >= 2.5) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-700 border-red-200";
}

function getStatus(nota: number) {
  if (nota >= 3.5) return "Aprovado";
  if (nota >= 2.5) return "Recuperação";
  return "Reprovado";
}

export default function ProfessorPage() {
  const [pin, setPin] = useState("");
  const [results, setResults] = useState<Result[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(res.status === 401 ? "PIN incorreto. Tente novamente." : data.error || "Erro no servidor.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResults(data.results);
    } catch {
      setError("Erro de conexão.");
    }
    setLoading(false);
  }

  // Login screen
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100/80 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-8 py-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-white text-xl font-bold">Painel do Professor</h2>
                <p className="text-slate-300 text-sm mt-1">Acesso restrito</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="px-8 py-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">PIN de acesso</label>
                <input
                  type="password"
                  placeholder="Digite o PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/40 focus:border-slate-400 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !pin}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer shadow-lg shadow-slate-200/50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  const totalAlunos = results.length;
  const media = totalAlunos > 0 ? results.reduce((s, r) => s + r.nota, 0) / totalAlunos : 0;
  const aprovados = results.filter((r) => r.nota >= 3.5).length;
  const melhorNota = totalAlunos > 0 ? Math.max(...results.map((r) => r.nota)) : 0;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Painel do Professor</h2>
          <p className="text-sm text-gray-500">Resultados da prova — Análise de Sistemas</p>
        </div>
        <button
          onClick={() => setResults(null)}
          className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
        >
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100/80 shadow-sm">
          <Users className="w-5 h-5 text-indigo-500 mb-2" />
          <p className="text-2xl font-bold text-gray-800">{totalAlunos}</p>
          <p className="text-xs text-gray-500">Total de alunos</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100/80 shadow-sm">
          <BarChart3 className="w-5 h-5 text-blue-500 mb-2" />
          <p className="text-2xl font-bold text-gray-800">{media.toFixed(2).replace(".", ",")}</p>
          <p className="text-xs text-gray-500">Média geral</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100/80 shadow-sm">
          <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
          <p className="text-2xl font-bold text-gray-800">{aprovados}</p>
          <p className="text-xs text-gray-500">Aprovados</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100/80 shadow-sm">
          <Trophy className="w-5 h-5 text-yellow-500 mb-2" />
          <p className="text-2xl font-bold text-gray-800">{melhorNota.toFixed(2).replace(".", ",")}</p>
          <p className="text-xs text-gray-500">Maior nota</p>
        </div>
      </div>

      {/* Ranking table */}
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="font-bold text-gray-800">Ranking dos Alunos</h3>
          <span className="ml-auto text-xs text-gray-400 font-medium">{totalAlunos} alunos</span>
        </div>

        {totalAlunos === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400">
            <Users className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="font-medium">Nenhum aluno realizou a prova ainda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 w-12">#</th>
                  <th className="px-4 py-3">Aluno</th>
                  <th className="px-4 py-3">Turma</th>
                  <th className="px-4 py-3 text-center">Acertos</th>
                  <th className="px-4 py-3 text-center">Nota</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((r, i) => (
                  <tr key={i} className={`hover:bg-gray-50/50 transition ${i < 3 ? "bg-yellow-50/20" : ""}`}>
                    <td className="px-6 py-3.5">{getRankIcon(i)}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-gray-800">{r.nome}</p>
                      <p className="text-xs text-gray-400">{r.email}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-100">
                        {r.turma}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center font-semibold text-gray-700">{r.acertos}/20</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`font-bold text-sm px-2.5 py-1 rounded-lg border ${getNotaBadge(r.nota)}`}>
                        {r.nota.toFixed(2).replace(".", ",")}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${getNotaBadge(r.nota)}`}>
                        {getStatus(r.nota)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right text-xs text-gray-400">
                      {new Date(r.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
