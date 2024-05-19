import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import { redirect } from '@sveltejs/kit';
import { sendVerificationMail } from '$lib/utils/emailer.js';

export const actions = {
    default: async ({ request, url }) => {
        let data = Object.fromEntries(await request.formData());
        const validationResult = validateUser(data);

        if(validationResult.status === 400) {
            return validationResult;
        }
        data = validationResult;

        const { user, verificationCode } = await db.users.signup(data);

        await sendVerificationMail(user, verificationCode, url.origin);

        return redirect(303, `/login`);
    },
}
