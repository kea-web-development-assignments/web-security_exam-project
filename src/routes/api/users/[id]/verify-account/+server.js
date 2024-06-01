import db from '$lib/utils/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, params }) {
    try {
        const { code } = await request.json();

        await db.users.verifyAccount(params.id, code);

        return new Response(200);
    } catch (error) {   
        console.error('Failed to verify account', error)

        if(error.status && error.message) {
            return json({
                error: { message: error.message },
                
            }, { status: error.status });
        }
  
        return json({
            error: {
                message: 'Something went wrong, try again later.',
            }
        }, { status: 500 });
    }
}
