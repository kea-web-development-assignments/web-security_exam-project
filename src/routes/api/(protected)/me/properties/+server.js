import db from '$lib/utils/db.js';
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';
import { validateProperty } from '$lib/utils/validator.js';
import { saveImagesToS3 } from '$lib/utils/imageProvider.js';
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
    try {
        const properties = await db.properties.findMany({
            where: {
                userId: locals.user.sub,
                blocked: false,
            },
            select: {
                id: true,
                name: true,
                place: true,
                description: true,
                lon: true,
                lat: true,
                pricePerNight: true,
                userId: true,
            },
            orderBy: [
                { createdAt: 'asc' },
            ],
        });

        return json({ properties });
    } catch (error) {
        console.error('Failed to get my properties:', error);

        return apiErrorHandler(error);
    }
}

export async function POST({ request, locals }) {
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
        const validationFields = ['name', 'place', 'lon', 'lat', 'pricePerNight', 'images'];

        if(data.description) {
            validationFields.push('description');
        }

        const validationResult = validateProperty(data, validationFields);
        if(validationResult.status === 400) {
            throw validationResult;
        }
        data = validationResult;

        const images = data.images;
        delete data.images;
        data.userId = locals.user.sub;
        const property = await db.properties.create({ data });

        await saveImagesToS3(property.userId, property.id, images);

        return json({ property });
    } catch (error) {
        console.error('Failed to add property:', error);

        return apiErrorHandler(error);
    }
}
