import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { gameId, playerName } = await request.json()

    // Validate input
    if (!gameId || !playerName) {
      return NextResponse.json(
        { message: 'Game ID and player name are required' },
        { status: 400 }
      )
    }

    // Check if game exists in your database/storage
    const gameExists = await checkGameExists(gameId)
    if (!gameExists) {
      return NextResponse.json(
        { message: 'Game not found' },
        { status: 404 }
      )
    }

    // Check if game is joinable (not full, not started, etc.)
    const canJoin = await checkGameJoinable(gameId)
    if (!canJoin) {
      return NextResponse.json(
        { message: 'Game cannot be joined' },
        { status: 403 }
      )
    }

    // Add player to game
    await addPlayerToGame(gameId, playerName)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error joining game:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}