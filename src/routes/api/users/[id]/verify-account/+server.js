import db from '$lib/utils/db.js';
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';

export async function PUT({ request, params }) {
    try {
        if(!request.body) {
            throw {
                status: 400,
                message: 'Data cannot be empty',
            };
        }
        
        const { code } = await request.json();

        await db.users.verifyAccount(params.id, code);

        return new Response();
    } catch (error) {   
        console.error('Failed to verify account', error)

        return apiErrorHandler(error);
    }
}
