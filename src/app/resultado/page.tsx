"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Resultado {
  nome: string;
  acertos: number;
  nota: number;
  total: number;
}

function getMensagem(nota: number): string {
  if (nota >= 4.5) return "🏆 Excelente! Você domina o conteúdo com maestria!";
  if (nota >= 3.5) return "🎉 Muito bem! Você foi aprovado com destaque!";
  if (nota >= 2.5) return "📚 Você foi aprovado! Continue estudando para melhorar ainda mais.";
  if (nota >= 1.5) return "💪 Não desanime! Revise o conteúdo e tente novamente.";
  return "📖 Estude com mais dedicação. Você vai conseguir na próxima!";
}

function getBadge(nota: number) {
  if (nota >= 3.5) return { label: "Aprovado ✓", class: "bg-green-100 text-green-700 border-green-200" };
  if (nota >= 2.5) return { label: "Recuperação", class: "bg-yellow-100 text-yellow-700 border-yellow-200" };
  return { label: "Reprovado", class: "bg-red-100 text-red-700 border-red-200" };
}

function getNotaColor(nota: number): string {
  if (nota >= 3.5) return "text-green-600";
  if (nota >= 2.5) return "text-yellow-500";
  return "text-red-500";
}

function getBarColor(nota: number): string {
  if (nota >= 3.5) return "bg-green-500";
  if (nota >= 2.5) return "bg-yellow-400";
  return "bg-red-500";
}

export default function ResultadoPage() {
  const router = useRouter();
  const [resultado, setResultado] = useState<Resultado | null>(null);

  useEffect(() => {
    const dados = sessionStorage.getItem("resultado");
    if (!dados) {
      router.push("/");
      return;
    }
    setResultado(JSON.parse(dados));
  }, [router]);

  if (!resultado) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const percentual = Math.round((resultado.acertos / resultado.total) * 100);
  const badge = getBadge(resultado.nota);
  const mensagem = getMensagem(resultado.nota);
  const notaFormatada = resultado.nota.toFixed(2).replace(".", ",");
  const barWidth = (resultado.nota / 5) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-lg">
        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-center">
            <div className="text-4xl mb-2">
              {resultado.nota >= 3.5 ? "🏆" : resultado.nota >= 2.5 ? "📊" : "📝"}
            </div>
            <h2 className="text-white text-lg font-bold">Resultado da Prova</h2>
            <p className="text-blue-100 text-sm mt-1">Análise de Sistemas — 2INF ETPC</p>
          </div>

          {/* Conteúdo */}
          <div className="px-8 py-7">
            {/* Nome */}
            <p className="text-center text-gray-500 text-sm mb-1">Aluno(a)</p>
            <p className="text-center text-gray-800 font-bold text-lg mb-6">{resultado.nome}</p>

            {/* Nota em destaque */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Nota Final</p>
              <p className={`text-7xl font-extrabold ${getNotaColor(resultado.nota)}`}>
                {notaFormatada}
              </p>
              <p className="text-gray-400 text-sm mt-1">de 5,00 pontos</p>
            </div>

            {/* Barra de progresso da nota */}
            <div className="mb-6">
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${getBarColor(resultado.nota)}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <p className="text-2xl font-bold text-gray-800">{resultado.acertos}</p>
                <p className="text-xs text-gray-500 mt-1">Acertos</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <p className="text-2xl font-bold text-gray-800">{resultado.total - resultado.acertos}</p>
                <p className="text-xs text-gray-500 mt-1">Erros</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <p className="text-2xl font-bold text-gray-800">{percentual}%</p>
                <p className="text-xs text-gray-500 mt-1">Aproveit.</p>
              </div>
            </div>

            {/* Acertos de 20 */}
            <div className="text-center mb-5">
              <span className="text-gray-600 text-sm font-medium">
                {resultado.acertos} de {resultado.total} questões corretas
              </span>
            </div>

            {/* Badge de status */}
            <div className="flex justify-center mb-5">
              <span className={`text-sm font-bold px-5 py-2 rounded-full border-2 ${badge.class}`}>
                {badge.label}
              </span>
            </div>

            {/* Mensagem motivacional */}
            <div className="bg-blue-50 rounded-xl px-5 py-4 text-center border border-blue-100 mb-6">
              <p className="text-blue-800 text-sm font-medium leading-relaxed">{mensagem}</p>
            </div>

            {/* Botão */}
            <button
              onClick={() => {
                sessionStorage.clear();
                router.push("/");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              🔄 Fazer nova tentativa
            </button>
          </div>
        </div>

        {/* Info rodapé */}
        <p className="text-center text-gray-400 text-xs mt-4">
          Resultado salvo com sucesso no banco de dados
        </p>
      </div>
    </div>
  );
}
