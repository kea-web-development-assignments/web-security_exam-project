import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import { fail, redirect } from '@sveltejs/kit';
import { sendPasswordResetMail } from '$lib/utils/emailer.js';

export const actions = {
    default: async ({ request, url }) => {
        return fail(400, {
            error: { message: 'haaaaa' },
        });
        const data = Object.fromEntries(await request.formData());
        const validationResult = validateUser(data, ['email']);

        if(validationResult.status === 400) {
            return validationResult;
        }

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

        return redirect(303, `/login`);
    },
}
