// src/services/index.ts
export const gameService = {
  getGameById: async (gameId: string) => {
    // Fetch game by ID from the database
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { players: true }
    });
    return game;
  },    
  // Add game-related service functions here
  createGame: async (player: PlayerJoinRequest) => {

    const gameId = Math.random().toString(36).substring(7);

    await prisma.game.create({
      data: {
        id: gameId,
        players: {
          create: {
            id: player.id,
            name: player.name
          }
        }
      }
    });
    return gameId;
  }
};
export const exampleServiceFunction = () => {
  // Business logic goes here
};