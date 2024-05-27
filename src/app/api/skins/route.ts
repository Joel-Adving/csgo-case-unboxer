import { prisma } from '@/libs/prisma'
import { getAndCombineSkinsData, updateSkins } from '@/services/skinsApi'
import { authorized } from '@/utils/serverFunctions'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const skins = await prisma.skin.findMany()
    return NextResponse.json(skins)
  } catch (error) {
    return NextResponse.json({ message: 'error getting skins' })
  }
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ message: 'unauthorized' })
  }
  try {
    const skins = await getAndCombineSkinsData()
    if (!skins) {
      return NextResponse.json({ message: 'error getting skins' })
    }
    return NextResponse.json(skins)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'error getting skins' })
  }
}

export async function PUT(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ message: 'unauthorized' })
  }
  try {
    await updateSkins()
    return NextResponse.json({ message: 'skins updated' })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'error updating skins' })
  }
}
