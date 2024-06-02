import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import { fail } from '@sveltejs/kit';
import { sendPasswordResetMail } from '$lib/utils/emailer.js';
import errorHandler from '$lib/utils/errorHandler.js';

export const actions = {
    default: async ({ request, url }) => {
        try {
            let data = Object.fromEntries(await request.formData());
            const validationResult = validateUser(data, ['email']);

            if(validationResult.status === 400) {
                return validationResult;
            }
            data = validationResult;

            const user = await db.users.findFirst({ where: { email: data.email } });

            if(!user) {
                return fail(404, {
                    error: { message: 'No user with that email' },
                });
            }

            const { id: resetCode } = await db.forgottenPasswordRequests.create({
                data: { userId: user.id },
            });
            await sendPasswordResetMail(user, resetCode, url.origin);

            throw { status: 303, location: '/login' };
        } catch (error) {
            return errorHandler(error, undefined, {
                logMessage: 'Failed to handle reset password request'
            });
        }
    },
}
