"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";

const LETRAS = ["A", "B", "C", "D", "E"];

const TEMAS_CORES: Record<string, string> = {
  "NeonDB": "bg-purple-100 text-purple-700 border-purple-200",
  "Diagrama de Caso de Uso": "bg-orange-100 text-orange-700 border-orange-200",
  "Query Básica SQL": "bg-green-100 text-green-700 border-green-200",
  "Relacionamento de Tabelas": "bg-blue-100 text-blue-700 border-blue-200",
  "Diagrama de Classes": "bg-pink-100 text-pink-700 border-pink-200",
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
      setErro(`Você ainda tem ${naoRespondidas} questão(ões) sem resposta. Deseja continuar mesmo assim?`);
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
      sessionStorage.setItem("resultado", JSON.stringify({ ...data, nome: aluno.nome }));
      router.push("/resultado");
    } catch {
      setErro("Erro ao enviar respostas. Tente novamente.");
      setEnviando(false);
    }
  }

  const todasRespondidas = respostas.every((r) => r !== null);
  const isUltima = questaoAtual === questions.length - 1;

  if (!aluno) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Cabeçalho da prova */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Questão <span className="text-blue-600 font-bold">{questaoAtual + 1}</span> de {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {respostas.filter((r) => r !== null).length} respondidas
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* Card da questão */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        {/* Tema badge */}
        <div className="px-6 pt-5 pb-3 border-b border-gray-50">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${TEMAS_CORES[questao.tema] || "bg-gray-100 text-gray-600"}`}>
              {questao.tema}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded-md ${
              questao.nivel === "Básico"
                ? "bg-green-50 text-green-600"
                : "bg-amber-50 text-amber-600"
            }`}>
              {questao.nivel}
            </span>
          </div>
        </div>

        {/* Enunciado */}
        <div className="px-6 py-5">
          <p className="text-gray-800 font-semibold text-base leading-relaxed">
            {questaoAtual + 1}. {questao.enunciado}
          </p>
        </div>

        {/* Opções */}
        <div className="px-6 pb-6 space-y-3">
          {questao.opcoes.map((opcao, idx) => (
            <button
              key={idx}
              onClick={() => selecionar(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 flex items-start gap-3 ${
                respostaSelecionada === idx
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                  respostaSelecionada === idx
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-500 border border-gray-300"
                }`}
              >
                {LETRAS[idx]}
              </span>
              <span className={`text-sm leading-relaxed ${respostaSelecionada === idx ? "text-blue-800 font-medium" : "text-gray-700"}`}>
                {opcao}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Erro / aviso */}
      {erro && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
          <p className="text-amber-800 text-sm">{erro}</p>
          <button
            onClick={enviarRespostas}
            className="mt-2 text-amber-700 font-semibold text-sm underline"
          >
            Enviar mesmo assim
          </button>
        </div>
      )}

      {/* Navegação */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={voltar}
          disabled={questaoAtual === 0}
          className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ← Anterior
        </button>

        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setQuestaoAtual(idx)}
              className={`w-6 h-6 rounded-full text-xs font-medium transition ${
                idx === questaoAtual
                  ? "bg-blue-600 text-white"
                  : respostas[idx] !== null
                  ? "bg-green-400 text-white"
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300"
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
            className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold text-sm flex items-center gap-2 transition"
          >
            {enviando ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              </>
            ) : (
              <>✓ Finalizar Prova</>
            )}
          </button>
        ) : (
          <button
            onClick={avancar}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
          >
            Próxima →
          </button>
        )}
      </div>

      {/* Botão de finalizar quando todas respondidas */}
      {todasRespondidas && !isUltima && (
        <div className="mt-4 text-center">
          <button
            onClick={finalizar}
            disabled={enviando}
            className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold transition"
          >
            ✓ Finalizar Prova
          </button>
        </div>
      )}
    </div>
  );
}
