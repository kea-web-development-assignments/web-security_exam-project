import db from '$lib/utils/db.js';
import errorHandler from '$lib/utils/errorHandler.js';
import { sendAccountBlockedMail } from '$lib/utils/emailer.js';

export async function load() {
    try {
        const users = await db.users.findMany({
            where: {
                role: 'user',
                blocked: false,
                deletedAt: null,
            },
        });

        return {
            users: users.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNum: user.phoneNum,
                };
            }),
        };
    } catch (error) {
        console.error('Failed to get users:', error)

        return errorHandler(error, undefined, {
            fatal: true
        });
    }
}

export const actions = {
    blockUser: async ({ request, locals }) => {
        try {
            const { userId } = Object.fromEntries(await request.formData());
            locals.userId = userId;

            const user = await db.users.update({
                where: { id: userId },
                data: { blocked: true },
            });

            await sendAccountBlockedMail(user);

            return user;
        } catch (error) {
            console.error('Failed to block user:', error);

            return errorHandler(error, locals.userId);
        }
    },
}
