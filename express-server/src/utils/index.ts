// src/utils/index.ts
import { prisma } from './prisma'
import { GameData, PlayerData } from '../types/index'

export async function checkGameExists(gameId: string): Promise<boolean> {
  const game = await prisma.game.findUnique({
    where: { id: gameId }
  })
  return !!game
}

export async function checkGameJoinable(gameId: string): Promise<{
  joinable: boolean;
  reason?: string;
}> {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { players: true }
  })

  if (!game) {
    return { joinable: false, reason: 'Game not found' }
  }

  if (game.status !== 'waiting') {
    return { joinable: false, reason: 'Game has already started' }
  }

  if (game.players.length >= game.maxPlayers) {
    return { joinable: false, reason: 'Game is full' }
  }

  return { joinable: true }
}

export async function addPlayerToGame(
  gameId: string, 
  playerName: string
): Promise<PlayerData> {
  const player = await prisma.player.create({
    data: {
      name: playerName,
      game: { connect: { id: gameId } },
      joinedAt: new Date()
    }
  })

  // Update game status if max players reached
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { players: true }
  })

  if (game && game.players.length >= game.maxPlayers) {
    await prisma.game.update({
      where: { id: gameId },
      data: { status: 'playing' }
    })
  }

  return player
}
interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  timestamp: string;
}

interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

/**
 * Formats a successful API response
 * @param data The data to be returned
 * @param message Optional success message
 */
export const formatResponse = <T>(data: T, message = 'Success'): ApiResponse<T> => {
  return {
    status: 'success',
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

/**
 * Handles and formats API errors
 * @param error The error to be handled
 */
export const handleError = (error: unknown): ApiResponse<never> => {
  const apiError = error as ApiError;
  
  // Log error for debugging
  console.error('[Error]:', {
    message: apiError.message,
    stack: apiError.stack,
    details: apiError.details
  });

  return {
    status: 'error',
    message: apiError.message || 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  };
};

/**
 * Validates if a value is not null or undefined
 * @param value Value to check
 * @param name Name of the value for error message
 */
export const validateRequired = <T>(value: T | null | undefined, name: string): T => {
  if (value === null || value === undefined) {
    throw new Error(`${name} is required`);
  }
  return value;
};