import { NextRequest, NextResponse } from 'next/server';
import { getSql, initDB } from '@/lib/db';

const PROFESSOR_PIN = '2INF2026';

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();

    if (pin !== PROFESSOR_PIN) {
      return NextResponse.json({ error: 'PIN incorreto' }, { status: 401 });
    }

    await initDB();
    const sql = getSql();
    const results = await sql`
      SELECT nome, email, turma, acertos, nota, created_at
      FROM quiz_results
      ORDER BY nota DESC, acertos DESC, created_at ASC
    `;

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar resultados' }, { status: 500 });
  }
}
