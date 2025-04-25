import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createGame } from '@/lib/db/game'

export async function POST(request: NextRequest) {
  try {
    const { playerName } = await request.json()

    if (!playerName) {
      return NextResponse.json(
        { message: 'Player name is required' },
        { status: 400 }
      )
    }

    const game = await createGame(playerName)

    return NextResponse.json({ 
      gameId: game.id,
      success: true 
    })
  } catch (error) {
    console.error('Error creating game:', error)
    return NextResponse.json(
      { message: 'Failed to create game' },
      { status: 500 }
    )
  }
}