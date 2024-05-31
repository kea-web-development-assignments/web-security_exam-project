import { fail, error } from '@sveltejs/kit';

export default function(err, formId, options) {
    const { fatal } = options ?? {};
    let errorFunction = fatal ? error : fail;

    if(err.status && err.message) {
        if(formId) {
            return errorFunction(err.status, {
                [formId]: { error: { message: err.message } },
            });
        }
        else {
            return errorFunction(err.status, {
                error: { message: err.message },
            });
        }
    }

    if(formId) {
        return errorFunction(500, {
            [formId]: { error: { message: 'Something went wrong, try again later.' } },
        });
    }
    else {
        return errorFunction(500, {
            error: { message: 'Something went wrong, try again later.' },
        });
    }
}
