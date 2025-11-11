import mysql from 'mysql2/promise'

let connection: mysql.Connection

async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST || 'localhost',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || 'todo_app',
      port: parseInt(process.env.DATABASE_PORT || '3306')
    })
  }
  return connection
}

export async function query(sql: string, params?: any[]) {
  try {
    console.log('MySQL Query:', sql, params)
    const conn = await getConnection()
    const [results] = await conn.execute(sql, params || [])
    return results
  } catch (error) {
    console.error('Erreur MySQL:', error)
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
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `
  
  try {
    await query(createTableSQL)
    console.log('Table todos créée ou existe déjà')
  } catch (error) {
    console.error('Erreur lors de la création de la table:', error)
  }
}