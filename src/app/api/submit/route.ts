import { NextRequest, NextResponse } from 'next/server';
import { getSql, initDB } from '@/lib/db';
import { questions } from '@/lib/questions';

export async function POST(req: NextRequest) {
  try {
    await initDB();
    const sql = getSql();
    const { nome, email, turma, respostas } = await req.json();

    let acertos = 0;
    questions.forEach((q, i) => {
      if (respostas[i] === q.gabarito) acertos++;
    });

    const nota = parseFloat((acertos * 0.25).toFixed(2));

    await sql`
      INSERT INTO quiz_results (nome, email, turma, respostas, acertos, nota)
      VALUES (${nome}, ${email}, ${turma}, ${JSON.stringify(respostas)}, ${acertos}, ${nota})
    `;

    return NextResponse.json({ acertos, nota, total: questions.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao salvar resultado' }, { status: 500 });
  }
}
