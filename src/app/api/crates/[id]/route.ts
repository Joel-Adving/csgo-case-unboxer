import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  {
    params
  }: {
    params: { id: string }
  }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ message: 'No id provided' })
  }

  const crate = await prisma.crate.findFirst({
    where: { id },
    include: {
      skins: true
    }
  })

  return NextResponse.json(crate)
}
