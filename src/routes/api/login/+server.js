import { validateUser } from '$lib/utils/validator.js'
import db from '$lib/utils/db.js';
import { createAccessToken } from '$lib/utils/authenticator.js';
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';

export async function POST({ request, cookies }) {
    try {
        if(!request.body) {
            throw {
                status: 400,
                message: 'Data cannot be empty',
            };
        }

        let data = Object.fromEntries(await request.formData());
        const validationResult = validateUser(data, ['email', 'password']);

        if(validationResult.status === 400) {
            throw validationResult;
        }
        data = validationResult;

        const user = await db.users.login(data);

        if(!user) {
            throw {
                status: 401,
                message: 'Email or password is incorrect!',
            };
        }
        if(user.deletedAt) {
            throw {
                status: 403,
                message: 'Your account has been deleted, contact support for more info.',
            };
        }
        if(user.blocked) {
            throw {
                status: 403,
                message: 'Your account has been blocked, contact support for more info.',
            };
        }
        if(!user.verified) {
            throw {
                status: 403,
                message: 'You must be verified to log in, check your email for a verification link.',
            };
        }

        const token = createAccessToken(user);
        cookies.set('access_token', token, { path: '/' });

        return new Response();
    } catch (error) {
        console.error('Failed to login', error)
        
        return apiErrorHandler(error);
    }
}
