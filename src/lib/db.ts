import { neon } from '@neondatabase/serverless';

function getSQL() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não configurada');
  }
  return neon(process.env.DATABASE_URL);
}

export async function initDB() {
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      turma VARCHAR(100) NOT NULL,
      respostas JSONB NOT NULL,
      acertos INTEGER NOT NULL,
      nota DECIMAL(4,2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export function getSql() {
  return getSQL();
}
