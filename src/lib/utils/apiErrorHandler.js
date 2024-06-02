import { error, redirect } from '@sveltejs/kit';

export default function(err, options = {}) {
    if(err.status?.toString().startsWith('3')) {
        return redirect(err.status, err.location);
    }
    if(options.logMessage) {
        console.error(`${options.logMessage}:`, err);
    }

    if(err.status && err.data) {
        return error(err.status, err.data);
    }
    if(err.status && err.message) {
        return error(err.status, {
            error: { message: err.message },
        });
    }

    return error(500, {
        error: { message: 'Something went wrong, try again later.' },
    });
}
