// Ensure the Prisma engine type is set to a binary implementation when
// nothing else is provided by the environment. Some Prisma client
// distributions require either an adapter or an accelerateUrl when the
// engine type resolves to "client". Setting the env var to 'binary'
// forces the binary engine which is the common local setup.
if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
    process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';
}

// Use dynamic import so we can set environment variables before loading
// the Prisma runtime.
const { PrismaClient } = await import('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export default prisma;
