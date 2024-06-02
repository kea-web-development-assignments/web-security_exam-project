import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';
import { json } from '@sveltejs/kit';
import {
    sendAccountDeletedMail,
    sendAccountBlockedMail,
    sendAccountUnblockedMail
} from '$lib/utils/emailer.js';

export async function PATCH({ request, params }) {
    try {
        if(!request.body) {
            throw {
                status: 400,
                message: 'Data cannot be empty',
            };
        }

        let data = Object.fromEntries(await request.formData());
        const validationFields = Object.keys(data);

        const validationResult = validateUser(data, validationFields);

        if(validationResult.status === 400) {
            throw validationResult;
        }
        data = validationResult;

        const user = await db.users.findFirst({ where: { id: params.id } });

        if(!user) {
            throw {
                status: 404,
                message: 'User not found.',
            };
        }

        if(data.deletedAt && !user.deletedAt) {
            data.deletedAt = new Date();
            await sendAccountDeletedMail(user);
        }
        else if(data.deletedAt == 'null' && user.deletedAt) {
            data.deletedAt = null;
        }

        if(data.blocked == 'true' && data.blocked != user.blocked) {
            data.blocked = true;
            await sendAccountBlockedMail(user);
        }
        else if(data.blocked == 'false' && data.blocked != user.blocked) {
            data.blocked = false;
            await sendAccountUnblockedMail(user);
        }

        const newData = await db.users.update({
            where: { id: params.id },
            data,
        });

        delete newData.password;
        return json({ user: newData });
    } catch (error) {
        console.error('Failed to update user', error)

        return apiErrorHandler(error);
    }
}
