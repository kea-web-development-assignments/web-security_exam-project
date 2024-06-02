import errorHandler from '$lib/utils/errorHandler.js';

export const actions = {
    default: async (event) => {
        try {
            event.cookies.delete('access_token', { path: '/' });
            event.locals.user = null;

            throw { status: 303, location: '/login' };
        } catch (error) {
            return errorHandler(error, undefined, { logMessage: 'Failed to logout' });
        }
    }
};
