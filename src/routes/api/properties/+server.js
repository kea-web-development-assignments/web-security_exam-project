import db from '$lib/utils/db.js';
import apiErrorHandler from '$lib/utils/apiErrorHandler.js';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        const properties = await db.properties.findMany({
            where: { blocked: false },
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

        return json({ properties });
    } catch (error) {
        console.error('Failed to get properties:', error);

        return apiErrorHandler(error);
    }
}
