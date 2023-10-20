"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const roundsOfHashing = 10;
async function main() {
    const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
    const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);
    const user1 = await prisma.user.upsert({
        where: { email: 'sabin@adams.com' },
        update: {},
        create: {
            email: 'sabin@adams.com',
            password: passwordSabin,
        },
    });
    const user2 = await prisma.user.upsert({
        where: { email: 'alex@ruheni.com' },
        update: {},
        create: {
            email: 'alex@ruheni.com',
            password: passwordAlex,
        },
    });
    const post1 = await prisma.post.upsert({
        where: { title: 'Prisma Adds Support for MongoDB' },
        update: {
            authorId: user1.id,
        },
        create: {
            title: 'Prisma Adds Support for MongoDB',
            body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
            description: "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
            published: false,
            authorId: user1.id,
        },
    });
    const post2 = await prisma.post.upsert({
        where: { title: "What's new in Prisma? (Q1/22)" },
        update: {
            authorId: user2.id,
        },
        create: {
            title: "What's new in Prisma? (Q1/22)",
            body: 'Our engineers have been working hard, issuing new releases with many improvements...',
            description: 'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
            published: true,
            authorId: user2.id,
        },
    });
    const post3 = await prisma.post.upsert({
        where: { title: 'Prisma Client Just Became a Lot More Flexible' },
        update: {},
        create: {
            title: 'Prisma Client Just Became a Lot More Flexible',
            body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
            description: 'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
            published: true,
        },
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map