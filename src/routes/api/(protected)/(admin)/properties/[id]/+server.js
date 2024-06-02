import db from '$lib/utils/db.js';
import { validateProperty } from '$lib/utils/validator.js'
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';
import { json } from '@sveltejs/kit';
import { sendPropertyBlockedMail, sendPropertyUnblockedMail } from '$lib/utils/emailer.js';

export async function PATCH({ request, params }) {
    try {
        if(!request.body) {
            throw {
                status: 400,
                message: 'Data cannot be empty',
            };
        }

        const formData = await request.formData();
        let data = Object.fromEntries(formData);
        data.images = formData.getAll('images');
        const validationFields = Object.keys(data);

        if(!data.images?.[0]?.size) {
            validationFields.pop('images');
        }

        const validationResult = validateProperty(data, validationFields);
        if(validationResult.status === 400) {
            throw validationResult;
        }
        data = validationResult;

        const property = await db.properties.findFirst({
            where: { id: params.id },
            select: {
                id: true,
                name: true,
                blocked: true,
                users: {
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });

        if(!property) {
            throw {
                status: 404,
                message: 'Property not found.',
            };
        }

        if(data.blocked == 'true' && data.blocked != property.blocked) {
            data.blocked = true;
            await sendPropertyBlockedMail(property.users, property.name);
        }
        else if(data.blocked == 'false' && data.blocked != property.blocked) {
            data.blocked = false;
            await sendPropertyUnblockedMail(property.users, property.name);
        }

        const images = data.images;
        delete data.images;

        const newData = await db.properties.update({
            where: { id: params.id },
            data,
        });

        if(images) {
            await updateImagesInS3(newData.userId, newData.id, images);
        }

        return json({ property: newData });
    } catch (error) {
        console.error('Failed to update property:', error);

        return apiErrorHandler(error);
    }
}
