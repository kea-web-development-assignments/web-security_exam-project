import db from '$lib/utils/db.js';
import errorHandler from '$lib/utils/errorHandler.js';
import { getImageCountInS3 } from '$lib/utils/imageProvider.js';

export async function load({ params }) {
    try {
        const { id } = params;
        const property = await db.properties.findFirst({
            where: {
                id,
                blocked: false,
            }
        });

        if(!property) {
            throw {
                status: 404,
                message: 'Property does not exist',
            }
        }

        const imageCount = await getImageCountInS3(property.userId, property.id);

        return { property, imageCount };
    } catch (error) {
        console.error('Failed to get property:', error)

        return errorHandler(error, undefined, {
            fatal: true
        });
    }
}
