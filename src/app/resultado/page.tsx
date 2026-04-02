"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy, Target, XCircle, TrendingUp, CheckCircle, BookOpen, AlertTriangle } from "lucide-react";

interface Resultado {
  nome: string;
  acertos: number;
  nota: number;
  total: number;
}

function getMensagem(nota: number): { text: string; Icon: typeof Trophy } {
  if (nota >= 4.5) return { text: "Excelente! Você domina o conteúdo com maestria!", Icon: Trophy };
  if (nota >= 3.5) return { text: "Muito bem! Você foi aprovado com destaque!", Icon: CheckCircle };
  if (nota >= 2.5) return { text: "Você foi aprovado! Continue estudando para melhorar.", Icon: BookOpen };
  if (nota >= 1.5) return { text: "Não desanime! Revise o conteúdo e estude mais.", Icon: AlertTriangle };
  return { text: "Estude com mais dedicação. Você vai conseguir!", Icon: BookOpen };
}

function getBadge(nota: number) {
  if (nota >= 3.5) return { label: "Aprovado", class: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  if (nota >= 2.5) return { label: "Recuperação", class: "bg-amber-50 text-amber-700 border-amber-200" };
  return { label: "Reprovado", class: "bg-red-50 text-red-700 border-red-200" };
}

function getNotaColor(nota: number): string {
  if (nota >= 3.5) return "text-emerald-600";
  if (nota >= 2.5) return "text-amber-500";
  return "text-red-500";
}

function getBarColor(nota: number): string {
  if (nota >= 3.5) return "from-emerald-400 to-green-500";
  if (nota >= 2.5) return "from-amber-400 to-yellow-500";
  return "from-red-400 to-rose-500";
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
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const percentual = Math.round((resultado.acertos / resultado.total) * 100);
  const badge = getBadge(resultado.nota);
  const { text: mensagem, Icon: MensagemIcon } = getMensagem(resultado.nota);
  const notaFormatada = resultado.nota.toFixed(2).replace(".", ",");
  const barWidth = (resultado.nota / 5) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-100/80 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 px-8 py-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-white text-lg font-bold">Resultado da Prova</h2>
              <p className="text-blue-100 text-sm mt-1">Análise de Sistemas — 2INF ETPC</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-7">
            <p className="text-center text-gray-400 text-sm mb-1">Aluno(a)</p>
            <p className="text-center text-gray-800 font-bold text-lg mb-6">{resultado.nome}</p>

            {/* Nota */}
            <div className="text-center mb-6 animate-count-up">
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest font-semibold">Nota Final</p>
              <p className={`text-7xl font-extrabold ${getNotaColor(resultado.nota)}`}>
                {notaFormatada}
              </p>
              <p className="text-gray-400 text-sm mt-1">de 5,00 pontos</p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getBarColor(resultado.nota)} transition-all duration-1000`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-emerald-50/50 rounded-xl p-3 text-center border border-emerald-100/80">
                <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">{resultado.acertos}</p>
                <p className="text-xs text-gray-500">Acertos</p>
              </div>
              <div className="bg-red-50/50 rounded-xl p-3 text-center border border-red-100/80">
                <XCircle className="w-4 h-4 text-red-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">{resultado.total - resultado.acertos}</p>
                <p className="text-xs text-gray-500">Erros</p>
              </div>
              <div className="bg-blue-50/50 rounded-xl p-3 text-center border border-blue-100/80">
                <TrendingUp className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">{percentual}%</p>
                <p className="text-xs text-gray-500">Aproveit.</p>
              </div>
            </div>

            {/* Badge */}
            <div className="flex justify-center mb-5">
              <span className={`text-sm font-bold px-5 py-2 rounded-xl border-2 ${badge.class}`}>
                {badge.label}
              </span>
            </div>

            {/* Message */}
            <div className="bg-indigo-50/80 rounded-xl px-5 py-4 text-center border border-indigo-100">
              <div className="flex items-center justify-center gap-2">
                <MensagemIcon className="w-4 h-4 text-indigo-600" />
                <p className="text-indigo-800 text-sm font-medium leading-relaxed">{mensagem}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          Resultado salvo com sucesso no banco de dados
        </p>
      </div>
    </div>
  );
}
