import { prisma } from './prisma'
import { nanoid } from 'nanoid'

export async function createGame(creatorName: string) {
  const gameId = nanoid(6).toUpperCase()

  const game = await prisma.game.create({
    data: {
      id: gameId,
      status: 'waiting',
      maxPlayers: 4,
      players: {
        create: {
          name: creatorName,
          isCreator: true,
        }
      }
    },
    include: {
      players: true
    }
  })

  return game
}