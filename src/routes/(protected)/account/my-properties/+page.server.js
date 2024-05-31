import db from '$lib/utils/db.js';
import errorHandler from '$lib/utils/errorHandler.js';
import { validateProperty } from '$lib/utils/validator.js';
import { saveImagesToS3, updateImagesInS3, deleteImagesFromS3 } from '$lib/utils/imageProvider.js';

export async function load({ locals }) {
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
                lon: true,
                lat: true,
                pricePerNight: true,
                userId: true,
            },
            orderBy: [
                { createdAt: 'asc' },
            ],
        });

        return { properties };
    } catch (error) {
        console.error('Failed to get properties:', error)

        return errorHandler(error, undefined, {
            fatal: true
        });
    }
}

export const actions = {
    addProperty: async ({ request, locals }) => {
        try {
            const formData = await request.formData();
            let data = Object.fromEntries(formData);
            data.images = formData.getAll('images');

            const validationResult = validateProperty(data, undefined, 'addPropertyForm');
            if(validationResult.status === 400) {
                return validationResult;
            }
            data = validationResult;

            const images = data.images;
            delete data.images;
            data.userId = locals.user.sub;
            const property = await db.properties.create({ data });

            await saveImagesToS3(property.userId, property.id, images);

            return property;
        } catch (error) {
            console.error('Failed to add property:', error);

            return errorHandler(error, 'addPropertyForm');
        }
    },
    updateProperty: async ({ request, locals }) => {
        try {
            const formData = await request.formData();
            let data = Object.fromEntries(formData);
            const propertyId = data.id;
            data.images = formData.getAll('images');
            const validationFields = ['name', 'place', 'lon', 'lat', 'pricePerNight'];

            if(data.images?.[0]?.size) {
                validationFields.push('images');
            }

            const validationResult = validateProperty(data, validationFields, 'updatePropertyForm');
            if(validationResult.status === 400) {
                return validationResult;
            }
            data = validationResult;

            const images = data.images;
            delete data.images;
            const property = await db.properties.update({
                where: { id: propertyId, userId: locals.user.sub },
                data,
            });

            if(!property) {
                return fail(404, {
                    updatePropertyForm: { error: { message: 'Property not found' } },
                });
            }

            if(images) {
                await updateImagesInS3(property.userId, property.id, images);
            }

            return property;
        } catch (error) {
            console.error('Failed to update property:', error);

            return errorHandler(error, 'updatePropertyForm');
        }
    },
    deleteProperty: async ({ request, locals }) => {
        try {
            const { id } = Object.fromEntries(await request.formData());

            const property = await db.properties.delete({
                where: { id, userId: locals.user.sub }
            });
            await deleteImagesFromS3(property.userId, property.id);

            return property;
        } catch (error) {
            console.error('Failed to delete property:', error);

            return errorHandler(error, 'deletePropertyForm');
        }
    },
}
