import { prisma } from '@numo/database'

export const getPrismaClient = () => prisma

export type { PrismaClient } from '@numo/database'

