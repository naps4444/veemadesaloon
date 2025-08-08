// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// Use a declaration merging pattern to extend the global object's type
// This is a standard practice for singleton patterns in Next.js/Node.js
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create the client instance or reuse the existing one in development
const prisma = global.prisma || new PrismaClient({
  log: ['query'],
});

// In development, store the client instance on the global object
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Export the singleton instance
export default prisma;