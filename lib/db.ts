import Database from 'better-sqlite3'
import path from 'path'

let db: Database.Database

function getDatabase(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'todo.db')
    db = new Database(dbPath)

    // Enable WAL mode for better performance
    db.pragma('journal_mode = WAL')

    // Create tables
    initDatabase()
  }
  return db
}

export function query(sql: string, params?: any[]) {
  try {
    console.log('SQLite Query:', sql, params)
    const database = getDatabase()
    const stmt = database.prepare(sql)
    const result = params ? stmt.all(...params) : stmt.all()
    return result
  } catch (error) {
    console.error('Erreur SQLite:', error)
    throw error
  }
}

export function queryOne(sql: string, params?: any[]) {
  try {
    console.log('SQLite Query One:', sql, params)
    const database = getDatabase()
    const stmt = database.prepare(sql)
    const result = params ? stmt.get(...params) : stmt.get()
    return result
  } catch (error) {
    console.error('Erreur SQLite:', error)
    throw error
  }
}

export function execute(sql: string, params?: any[]) {
  try {
    console.log('SQLite Execute:', sql, params)
    const database = getDatabase()
    const stmt = database.prepare(sql)
    const result = params ? stmt.run(...params) : stmt.run()
    return result
  } catch (error) {
    console.error('Erreur SQLite:', error)
    throw error
  }
}

export function initDatabase() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `

  try {
    execute(createTableSQL)
    console.log('Table todos créée ou existe déjà')
  } catch (error) {
    console.error('Erreur lors de la création de la table:', error)
  }
}

// Initialize database on module load
getDatabase()
