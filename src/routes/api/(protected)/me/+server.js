import bcrypt from 'bcrypt';
import db from '$lib/utils/db.js';
import { validateUser } from '$lib/utils/validator.js'
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';
import { json } from '@sveltejs/kit';
import { sendAccountDeletedMail } from '$lib/utils/emailer.js';

export async function GET({ locals }) {
    try {
        const profileInfo = await db.users.findFirst({
            where: { id: locals.user.sub },
            select: {
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                phoneNum: true,
            },
        });

        return json({ profileInfo });
    } catch (error) {   
        console.error('Failed to get profile info', error)

        return apiErrorHandler(error);
    }
}

export async function PATCH({ request, locals }) {
    try {
        if(!request.body) {
            throw {
                status: 400,
                message: 'Data cannot be empty',
            };
        }

        let data = Object.fromEntries(await request.formData());
        const validationFields = Object.keys(data)
            .filter((field) => field !== 'deletedAt' && field !== 'blocked');

        if(validationFields.includes('password')) {
            validationFields.push('oldPassword');
        }

        const validationResult = validateUser(data, validationFields);

        if(validationResult.status === 400) {
            throw validationResult;
        }
        data = validationResult;

        const user = await db.users.findFirst({
            where: { id: locals.user.sub },
            select: { password: true },
        });

        if(data.oldPassword && !(await bcrypt.compare(data.oldPassword, user.password))) {
            throw {
                status: 400,
                message: 'Old password incorrect',
            };
        }

        delete data.oldPassword;

        const newData = await db.users.update({
            where: { id: locals.user.sub },
            data,
        });

        const profileInfo = {
            username: newData.username,
            firstName: newData.firstName,
            lastName: newData.lastName,
            email: newData.email,
            phoneNum: newData.phoneNum,
        }

        return json({ profileInfo });
    } catch (error) {
        console.error('Failed to update profile', error)

        return apiErrorHandler(error);
    }
}

export async function DELETE({ request, locals, cookies }) {
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
            return validationResult;
        }
        data = validationResult;

        const user = await db.users.deleteAccount(locals.user.sub, data.password);

        await sendAccountDeletedMail(user);
    } catch (error) {
        console.error('Failed to delete profile', error)

        return apiErrorHandler(error);
    }

    cookies.delete('access_token', { path: '/' });
    locals.user = null;

    return new Response();
}
