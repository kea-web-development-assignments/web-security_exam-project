import db from '$lib/utils/db.js';
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        const users = await db.users.findMany({
            where: { role: 'user' },
        });

        return json({
            users: users.map((user) => {
                delete user.password;

                return user;
            }),
        });
    } catch (error) {
        console.error('Failed to get users:', error);

        return apiErrorHandler(error);
    }
}
