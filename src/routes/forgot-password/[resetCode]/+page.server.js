import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import errorHandler from '$lib/utils/errorHandler.js'

export const actions = {
    default: async ({ params, request }) => {
        try {
            let data = Object.fromEntries(await request.formData());
            const validationResult = validateUser(data, ['password']);

            if(validationResult.status === 400) {
                return validationResult;
            }
            data = validationResult;

            await db.users.resetPassword(params.resetCode, data.password);

            throw { status: 303, location: '/login' };
        } catch (error) {
            return errorHandler(error, undefined, { logMessage: 'Failed to reset password' });
        }
    },
}
