import db from '$lib/utils/db.js';
import errorHandler from '$lib/utils/errorHandler.js';
import { getImageCountInS3 } from '$lib/utils/imageProvider.js';
import { validateComment } from '../../../lib/utils/validator.js';

export async function load({ params }) {
    try {
        const { id } = params;
        const property = await db.properties.findFirst({
            where: {
                id,
                blocked: false,
            }
        });

        const comments = await db.comments.findMany({
            where: { propertyId: property.id },
            select: {
                id: true,
                description: true,
                createdAt: true,
                users: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: [
                { createdAt: 'desc' },
            ],
        })

        if(!property) {
            throw {
                status: 404,
                message: 'Property does not exist',
            }
        }

        const imageCount = await getImageCountInS3(property.userId, property.id);

        return { property, comments, imageCount };
    } catch (error) {
        console.error('Failed to get property and comments:', error)

        return errorHandler(error, undefined, {
            fatal: true
        });
    }
}

export const actions = {
    addComment: async ({ request, locals, params }) => {
        try {
            const formData = await request.formData();
            let data = Object.fromEntries(formData);

            const validationResult = validateComment(data);
            if(validationResult.status === 400) {
                return validationResult;
            }
            data = validationResult;

            data.userId = locals.user.sub;
            data.propertyId = params.id
            const comment = await db.comments.create({ data });

            return comment;
        } catch (error) {
            console.error('Failed to add comment to property:', error);

            return errorHandler(error);
        }
    },
}
