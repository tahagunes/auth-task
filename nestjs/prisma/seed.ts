// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;
async function main() {
    const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
    const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

    const user1 = await prisma.user.upsert({
        where: { email: 'sabin@adams.com' },
        update: {
            password: passwordSabin,
        },
        create: {
            email: 'sabin@adams.com',
            password: passwordSabin,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'alex@ruheni.com' },
        update: {
            password: passwordAlex,
        },
        create: {
            email: 'alex@ruheni.com',
            password: passwordAlex,
        },
    });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
