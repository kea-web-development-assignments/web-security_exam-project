import db from '$lib/utils/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ params }) {
    try {
        await db.users.verifyAccount(params.verificationCode);

        return new Response(200);
    } catch (error) {   
        console.error('Failed to get locations', error)

        if(error.status && error.message) {
            return json({
                error: { message: error.message },
                
            }, { status: error.status });
        }
  
        return json({
            error: {
                message: 'Something went wrong, try again later.',
            }
        }, { status: 500 })
    }
}
