import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import { sendVerificationMail } from '$lib/utils/emailer.js';
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
        const validationResult = validateUser(data);

        if(validationResult.status === 400) {
            throw validationResult;
        }
        data = validationResult;

        const { user, verificationCode } = await db.users.signup(data);

        await sendVerificationMail(user, verificationCode, url.origin);

        return new Response();
    } catch (error) {
        console.error('Failed to signup', error)

        return apiErrorHandler(error);
    }
}
