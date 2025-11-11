import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// PUT - Mettre à jour une todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { text, completed } = await request.json()
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'ID de la todo requis' },
        { status: 400 }
      )
    }

    const updateFields = []
    const values = []

    if (text !== undefined) {
      updateFields.push('text = ?')
      values.push(text.trim())
    }

    if (completed !== undefined) {
      updateFields.push('completed = ?')
      values.push(completed)
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'Aucun champ à mettre à jour' },
        { status: 400 }
      )
    }

    updateFields.push('updated_at = ?')
    values.push(new Date())
    values.push(id)

    await query(
      `UPDATE todos SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    )

    // Récupérer la todo mise à jour
    const [updatedTodo] = await query('SELECT * FROM todos WHERE id = ?', [id]) as any[]

    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTodo)
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la todo:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la todo' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'ID de la todo requis' },
        { status: 400 }
      )
    }

    const result = await query('DELETE FROM todos WHERE id = ?', [id]) as any

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Todo non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Todo supprimée avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de la todo:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la todo' },
      { status: 500 }
    )
  }
}