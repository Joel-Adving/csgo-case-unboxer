import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const crates = await prisma.crate.findMany({
    where: {
      type: 'Souvenir'
    }
  })
  return NextResponse.json(crates)
}
