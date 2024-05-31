import db from '$lib/utils/db.js';
import errorHandler from '$lib/utils/errorHandler.js';
import { sendPropertyUnblockedMail } from '$lib/utils/emailer.js';

export async function load({ locals }) {
    try {
        const properties = await db.properties.findMany({
            where: {
                blocked: true,
                NOT: {
                    userId: locals.user.sub,
                }
            },
            select: {
                id: true,
                name: true,
                place: true,
                users: {
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: [
                { createdAt: 'asc' },
            ],
        });

        return { properties };
    } catch (error) {
        console.error('Failed to get blocked properties:', error)

        return errorHandler(error, undefined, {
            fatal: true
        });
    }
}

export const actions = {
    unblockProperty: async ({ request, locals }) => {
        try {
            const { id, email, firstName, lastName } = Object.fromEntries(await request.formData());
            locals.propertyId = id;

            const property = await db.properties.update({
                where: { id },
                data: { blocked: false },
            });

            if(email && firstName && lastName) {
                await sendPropertyUnblockedMail({ email, firstName, lastName }, property.name);
            }

            return property;
        } catch (error) {
            console.error('Failed to unblock property:', error);

            return errorHandler(error, locals.propertyId);
        }
    },
}
