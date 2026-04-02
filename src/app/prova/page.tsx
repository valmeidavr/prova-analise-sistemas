"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { ChevronLeft, ChevronRight, Check, Loader2, AlertTriangle } from "lucide-react";

const LETRAS = ["A", "B", "C", "D", "E"];

const TEMAS_CORES: Record<string, string> = {
  "NeonDB": "bg-purple-50 text-purple-700 border-purple-200",
  "Diagrama de Caso de Uso": "bg-orange-50 text-orange-700 border-orange-200",
  "Query Básica SQL": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Relacionamento de Tabelas": "bg-blue-50 text-blue-700 border-blue-200",
  "Diagrama de Classes": "bg-pink-50 text-pink-700 border-pink-200",
};

export default function ProvaPage() {
  const router = useRouter();
  const [aluno, setAluno] = useState<{ nome: string; email: string; turma: string } | null>(null);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<(number | null)[]>(Array(20).fill(null));
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const dados = sessionStorage.getItem("aluno");
    if (!dados) {
      router.push("/");
      return;
    }
    setAluno(JSON.parse(dados));
  }, [router]);

  const progresso = ((questaoAtual + 1) / questions.length) * 100;
  const questao = questions[questaoAtual];
  const respostaSelecionada = respostas[questaoAtual];

  function selecionar(opcaoIdx: number) {
    const novas = [...respostas];
    novas[questaoAtual] = opcaoIdx;
    setRespostas(novas);
  }

  function avancar() {
    if (questaoAtual < questions.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    }
  }

  function voltar() {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
    }
  }

  async function finalizar() {
    if (!aluno) return;

    const naoRespondidas = respostas.filter((r) => r === null).length;
    if (naoRespondidas > 0) {
      setErro(`Você ainda tem ${naoRespondidas} questão(ões) sem resposta. Deseja enviar mesmo assim?`);
      return;
    }

    await enviarRespostas();
  }

  async function enviarRespostas() {
    if (!aluno) return;
    setEnviando(true);
    setErro("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: aluno.nome,
          email: aluno.email,
          turma: aluno.turma,
          respostas: respostas.map((r) => r ?? -1),
        }),
      });
      const data = await res.json();
      if (data.alreadyDone) {
        setErro("Você já realizou esta prova anteriormente.");
        setEnviando(false);
        return;
      }
      sessionStorage.setItem("resultado", JSON.stringify({ ...data, nome: aluno.nome }));
      router.push("/resultado");
    } catch {
      setErro("Erro ao enviar respostas. Tente novamente.");
      setEnviando(false);
    }
  }

  const todasRespondidas = respostas.every((r) => r !== null);
  const isUltima = questaoAtual === questions.length - 1;
  const respondidas = respostas.filter((r) => r !== null).length;

  if (!aluno) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              Questão
            </span>
            <span className="bg-indigo-600 text-white text-sm font-bold px-2.5 py-0.5 rounded-lg">
              {questaoAtual + 1}/{questions.length}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-500">
            <span className="text-emerald-600 font-semibold">{respondidas}</span> respondidas
          </span>
        </div>
        <div className="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100/80 overflow-hidden mb-5 animate-scale-in" key={questaoAtual}>
        {/* Theme + Level */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${TEMAS_CORES[questao.tema] || "bg-gray-100 text-gray-600"}`}>
            {questao.tema}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
            questao.nivel === "Básico"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600"
          }`}>
            {questao.nivel}
          </span>
        </div>

        {/* Question text */}
        <div className="px-6 py-4">
          <p className="text-gray-800 font-semibold text-base leading-relaxed">
            {questaoAtual + 1}. {questao.enunciado}
          </p>
        </div>

        {/* Options */}
        <div className="px-6 pb-6 space-y-2.5">
          {questao.opcoes.map((opcao, idx) => (
            <button
              key={idx}
              onClick={() => selecionar(idx)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-200 flex items-start gap-3 cursor-pointer group ${
                respostaSelecionada === idx
                  ? "border-indigo-500 bg-indigo-50/80 shadow-sm shadow-indigo-100"
                  : "border-gray-100 bg-gray-50/50 hover:border-indigo-200 hover:bg-indigo-50/30"
              }`}
            >
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5 transition-all duration-200 ${
                  respostaSelecionada === idx
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-400 border border-gray-200 group-hover:border-indigo-200 group-hover:text-indigo-400"
                }`}
              >
                {LETRAS[idx]}
              </span>
              <span className={`text-sm leading-relaxed ${respostaSelecionada === idx ? "text-indigo-800 font-medium" : "text-gray-600"}`}>
                {opcao}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {erro && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-amber-800 text-sm">{erro}</p>
            {erro.includes("sem resposta") && (
              <button
                onClick={enviarRespostas}
                className="mt-1.5 text-amber-700 font-semibold text-sm underline underline-offset-2 cursor-pointer hover:text-amber-900"
              >
                Enviar mesmo assim
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={voltar}
          disabled={questaoAtual === 0}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 font-medium text-sm hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1.5 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>

        {/* Dots navigation */}
        <div className="flex gap-1 flex-wrap justify-center">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setQuestaoAtual(idx)}
              className={`w-6 h-6 rounded-lg text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                idx === questaoAtual
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : respostas[idx] !== null
                  ? "bg-emerald-400 text-white"
                  : "bg-gray-200/80 text-gray-400 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {isUltima ? (
          <button
            onClick={finalizar}
            disabled={enviando}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-emerald-300 disabled:to-green-400 text-white font-semibold text-sm flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-emerald-100"
          >
            {enviando ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" /> Finalizar
              </>
            )}
          </button>
        ) : (
          <button
            onClick={avancar}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-sm transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-100"
          >
            Próxima <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Floating finish button */}
      {todasRespondidas && !isUltima && (
        <div className="mt-5 text-center animate-slide-up">
          <button
            onClick={finalizar}
            disabled={enviando}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-emerald-300 disabled:to-green-400 text-white font-semibold transition cursor-pointer shadow-lg shadow-emerald-100/50 flex items-center gap-2 mx-auto"
          >
            <Check className="w-5 h-5" /> Finalizar Prova
          </button>
        </div>
      )}
    </div>
  );
}
