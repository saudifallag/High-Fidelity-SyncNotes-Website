import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  try {
    return new PrismaClient({
      log: ['query'],
    })
  } catch (error) {
    console.warn("Failed to initialize Prisma Client in db.ts", error);
    return undefined;
  }
}

export const db = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db