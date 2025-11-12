import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT || '5432'),
  ssl: {
    rejectUnauthorized: false
  }
})

export async function query(sql: string, params?: any[]) {
  try {
    console.log('PostgreSQL Query:', sql, params)
    const result = await pool.query(sql, params)
    return result.rows
  } catch (error) {
    console.error('Erreur PostgreSQL:', error)
    throw error
  }
}

export async function initDatabase() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS todos (
      id VARCHAR(36) PRIMARY KEY,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
  
  try {
    await query(createTableSQL)
    console.log('Table todos créée ou existe déjà')
  } catch (error) {
    console.error('Erreur lors de la création de la table:', error)
  }
}