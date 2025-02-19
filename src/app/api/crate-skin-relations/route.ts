import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const crateToSkins = await prisma.$queryRaw`select * from "_CrateToSkin";`;
  return NextResponse.json(crateToSkins);
}
