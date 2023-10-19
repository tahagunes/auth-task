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
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map