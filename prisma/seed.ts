import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'demo@syncnotes.com'
    const password = 'demo12'
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Demo User',
            password: hashedPassword,
            subscriptionTier: 'STUDENT',
            notes: {
                create: [
                    {
                        title: 'Welcome to SyncNotes!',
                        content: 'This is a demo note to get you started. Feel free to edit or delete it.',
                    },
                    {
                        title: 'Project Ideas',
                        content: '- Build a cool drawing feature\n- Integrate Neon database\n- Launch on Vercel',
                    },
                ],
            },
        },
    })

    console.log({ user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
