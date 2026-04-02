import { NextRequest, NextResponse } from 'next/server';
import { getSql, initDB } from '@/lib/db';
import { questions } from '@/lib/questions';

export async function POST(req: NextRequest) {
  try {
    await initDB();
    const sql = getSql();
    const { nome, email, turma, respostas } = await req.json();

    // Check if student already took the exam
    const existing = await sql`
      SELECT id FROM quiz_results WHERE email = ${email} LIMIT 1
    `;
    if (existing.length > 0) {
      return NextResponse.json({ alreadyDone: true });
    }

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

// Check if email already submitted
export async function PUT(req: NextRequest) {
  try {
    await initDB();
    const sql = getSql();
    const { email } = await req.json();

    const existing = await sql`
      SELECT id FROM quiz_results WHERE email = ${email} LIMIT 1
    `;

    return NextResponse.json({ alreadyDone: existing.length > 0 });
  } catch {
    return NextResponse.json({ alreadyDone: false });
  }
}
