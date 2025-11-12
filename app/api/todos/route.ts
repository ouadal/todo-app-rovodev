import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { query, execute } from '@/lib/db-sqlite'

// GET - Récupérer toutes les todos
export async function GET() {
  try {
    const todos = await query('SELECT * FROM todos ORDER BY created_at DESC')
    return NextResponse.json(todos)
  } catch (error) {
    console.error('Erreur lors de la récupération des todos:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des todos' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle todo
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le texte de la todo est requis' },
        { status: 400 }
      )
    }

    const id = uuidv4()
    const now = new Date()

    await execute(
      'INSERT INTO todos (id, text, completed, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [id, text.trim(), 0, now.toISOString(), now.toISOString()]
    )

    const newTodo = {
      id,
      text: text.trim(),
      completed: false,
      created_at: now,
      updated_at: now
    }

    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la todo:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la todo' },
      { status: 500 }
    )
  }
}