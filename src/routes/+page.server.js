import db from '$lib/utils/db.js';
import errorHandler from '$lib/utils/errorHandler.js';

export async function load({ locals }) {
    try {
        const properties = await db.properties.findMany({
            where: {
                blocked: false,
                NOT: {
                    userId: locals.user?.sub ?? undefined,
                }
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

        return errorHandler(error);
    }
}
