import db from '$lib/utils/db.js';
import errorHandler from '$lib/utils/errorHandler.js';
import { validateProperty } from '$lib/utils/validator.js';

export async function load({ locals }) {
    try {
        const properties = await db.properties.findMany({
            where: {
                userId: locals.user.sub,
            },
        });

        return {
            properties: properties.map((property) => {
                return {
                    id: property.id,
                    name: property.name,
                    place: property.place,
                    lon: property.lon,
                    lat: property.lat,
                    pricePerNight: property.pricePerNight,
                    blocked: property.blocked,
                };
            }),
        };
    } catch (error) {
        console.error('Failed to get properties:', error)

        return errorHandler(error);
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

            //upload images

            delete data.images;
            data.userId = locals.user.sub;
            const property = db.properties.create({ data });

            return property;
        } catch (error) {
            console.error('Failed to add property:', error);

            return errorHandler(error, 'addPropertyForm');
        }
    },
}
