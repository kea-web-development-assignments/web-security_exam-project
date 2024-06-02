import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';

export async function PUT({ request, params }) {
    try {
        if(!request.body) {
            throw {
                status: 400,
                message: 'Data cannot be empty',
            };
        }

        let data = Object.fromEntries(await request.formData());
        const validationResult = validateUser(data, ['password']);

        if(validationResult.status === 400) {
            throw validationResult;
        }
        data = validationResult;

        await db.users.resetPassword(params.resetCode, data.password);

        return new Response();
    } catch (error) {   
        console.error('Failed to reset password', error)

        return apiErrorHandler(error);
    }
}
