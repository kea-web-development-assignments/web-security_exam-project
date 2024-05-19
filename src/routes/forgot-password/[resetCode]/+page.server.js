import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ params, request }) => {
        let data = Object.fromEntries(await request.formData());
        const validationResult = validateUser(data, ['password']);

        if(validationResult.status === 400) {
            return validationResult;
        }
        data = validationResult;

        await db.users.resetPassword(params.resetCode, data.password);

        return redirect(303, `/login`);
    },
}
