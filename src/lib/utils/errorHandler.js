import { fail } from '@sveltejs/kit';

export default function(error, formId) {
    if(error.status && error.message) {
        if(formId) {
            return fail(error.status, {
                [formId]: { error: { message: error.message } },
            });
        }
        else {
            return fail(error.status, {
                error: { message: error.message },
            });
        }
    }

    if(formId) {
        return fail(500, {
            [formId]: { error: { message: 'Something went wrong, try again later.' } },
        });
    }
    else {
        return fail(500, {
            error: { message: 'Something went wrong, try again later.' },
        });
    }
}
