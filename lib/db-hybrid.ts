// Configuration hybride : SQLite en local, PostgreSQL en production

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV

if (isProduction) {
  // PostgreSQL pour la production sur Vercel
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
      console.log('PostgreSQL Query (Production):', sql, params)
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
      console.log('Table todos créée (PostgreSQL Production)')
    } catch (error) {
      console.error('Erreur création table PostgreSQL:', error)
    }
  }
} else {
  // SQLite pour le développement local
  import sqlite3 from 'sqlite3'
  import { open } from 'sqlite'
  import path from 'path'
  import fs from 'fs'

  let db: any = null

  async function getDatabase() {
    if (db) return db

    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    db = await open({
      filename: path.join(process.cwd(), 'data', 'todos.db'),
      driver: sqlite3.Database
    })

    await db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    return db
  }

  export async function query(sql: string, params?: any[]) {
    try {
      console.log('SQLite Query (Local):', sql, params)
      const database = await getDatabase()
      
      if (sql.toLowerCase().startsWith('select')) {
        return await database.all(sql, params)
      } else {
        await database.run(sql, params)
        return []
      }
    } catch (error) {
      console.error('Erreur SQLite:', error)
      throw error
    }
  }

  export async function initDatabase() {
    console.log('Base SQLite initialisée (Développement local)')
  }
}