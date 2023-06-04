import { prisma } from '@/libs/prisma'
import { authorized, getBymykelCases, getBymykelSouvenirs } from '@/utils/serverFunctions'
import { Crate } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const crates = await prisma.crate.findMany()
  return NextResponse.json(crates)
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ message: 'unauthorized' })
  }

  const [cases, souvenirs] = await Promise.all([getBymykelCases(), getBymykelSouvenirs()])
  const dbSkins = await prisma.skin.findMany()
  const combinedCrates = [...cases, ...souvenirs]
  const crates: Crate[] = []

  for (let i = 0; i < combinedCrates.length; i++) {
    const crate = combinedCrates[i]
    const { contains, contains_rare, description, ...rest } = crate

    const skins = [...contains, ...contains_rare]
      .map((skin) => {
        const dbSkin = dbSkins.find((dbSkin) => dbSkin.name === skin.name)
        return dbSkin ? { name: skin.name } : null
      })
      .filter((s) => s !== null) as { name: string }[]

    if (skins.length === 0) {
      continue
    }

    const createdCrate = await prisma.crate.create({
      data: {
        ...rest,
        skins: {
          connect: skins
        }
      }
    })

    crates.push(createdCrate)
  }

  return NextResponse.json(crates)
}
