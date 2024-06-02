import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import { sendPasswordResetMail } from '$lib/utils/emailer.js';
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';

export async function POST({ request, url }) {
    try {
        if(!request.body) {
            throw {
                status: 400,
                message: 'Data cannot be empty',
            };
        }

        let data = Object.fromEntries(await request.formData());
        const validationResult = validateUser(data, ['email']);

        if(validationResult.status === 400) {
            throw validationResult;
        }
        data = validationResult;

        const user = await db.users.findFirst({ where: { email: data.email } });

        if(!user) {
            throw {
                status: 404,
                message: 'No user with that email',
            };
        }

        const { id: resetCode } = await db.forgottenPasswordRequests.create({
            data: { userId: user.id },
        });
        await sendPasswordResetMail(user, resetCode, url.origin);

        return new Response();
    } catch (error) {   
        console.error('Failed to handle reset password request', error)

        return apiErrorHandler(error);
    }
}
