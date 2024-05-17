import jwt from "jsonwebtoken";
import { JWT_SECRET } from '$env/static/private';
import { fail } from "@sveltejs/kit";

export function createAccessToken({ id, firstName, lastName, role }) {
   try {
        return jwt.sign({
            sub: id,
            firstName,
            lastName,
            role,
        }, JWT_SECRET);        
    } catch (error) {
        console.error('Failed to create jwt:', error);

        return fail(500, {
            error: { message: 'Something went wrong, try again later' }
        });
    }
}

export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError) {
            return fail(401, {
                error: { message: 'Invalid access token' }
            });
        }

        console.error('Failed to verify jwt:', error);
        return fail(500, {
            error: { message: 'Something went wrong, try again later' }
        });
    }
}
