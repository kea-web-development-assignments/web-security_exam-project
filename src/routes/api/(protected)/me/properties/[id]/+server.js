import db from '$lib/utils/db.js';
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';
import { validateProperty } from '$lib/utils/validator.js';
import { updateImagesInS3, deleteImagesFromS3 } from '$lib/utils/imageProvider.js';
import { json } from '@sveltejs/kit';

export async function PATCH({ params, request, locals }) {
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
        const validationFields = Object.keys(data)
            .filter((field) => field !== 'blocked');

        if(!data.images?.[0]?.size) {
            validationFields.pop('images');
        }

        const validationResult = validateProperty(data, validationFields);
        if(validationResult.status === 400) {
            throw validationResult;
        }
        data = validationResult;

        const images = data.images;
        delete data.images;
        const property = await db.properties.update({
            where: {
                id: params.id,
                userId: locals.user.sub
            },
            data,
        }).catch((err) => {
            if(err.meta?.cause === 'Record to update not found.') throw {
                status: 404,
                message: 'Property not found',
            };
        });

        if(images) {
            await updateImagesInS3(property.userId, property.id, images);
        }

        return json({ property });
    } catch (error) {
        console.error('Failed to update my property:', error);

        return apiErrorHandler(error);
    }
}

export async function DELETE({ params, locals }) {
    try {
        const property = await db.properties.delete({
            where: {
                id: params.id,
                userId: locals.user.sub
            },
        }).catch((err) => {
            if(err.meta?.cause === 'Record to delete does not exist.') throw {
                status: 404,
                message: 'Property not found',
            };
        });

        await deleteImagesFromS3(property.userId, property.id);

        return json({ property });
    } catch (error) {
        console.error('Failed to delete my property:', error);

        return apiErrorHandler(error);
    }
}
