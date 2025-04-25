import { NextResponse } from 'next/server'
import { pusher } from '@/lib/pusher'

export async function POST(request: Request) {
  try {
    const { gameId } = await request.json()

    // Check if the channel exists in Pusher
    const channelInfo = await pusher.get({ 
      path: `/channels/game-${gameId}` 
    })

    if (!channelInfo)// filepath: c:\Users\lisam\https---github.com-DavinciDreams-vscrabble\app\api\game\validate\route.ts
import { NextResponse } from 'next/server'
import { pusher } from '@/lib/pusher'

export async function POST(request: Request) {
  try {
    const { gameId } = await request.json()

    // Check if the channel exists in Pusher
    const channelInfo = await pusher.get({ 
      path: `/channels/game-${gameId}` 
    })

    if (!channelInfo)