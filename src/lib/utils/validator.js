import { fail } from '@sveltejs/kit';

const fieldRequiredMessage = (fieldLabel) => `${fieldLabel} is required!`;
const fieldInvalidMessage = (fieldLabel) => `${fieldLabel} is invalid!`;

export const userFieldsLookup = {
    username: {
        label: 'Username',
        regex: '^[a-zA-Z0-9]{3,20}$',
    },
    firstName: {
        label: 'First name',
        regex: '^[a-zA-Z]{1,30}$',
    },
    lastName: {
        label: 'Last name',
        regex: '^[a-zA-Z]{1,30}$',
    },
    email: {
        label: 'Email',
        regex: '^[^@]+@[^@]+\\.[^@]+$',
    },
    password: {
        label: 'Password',
        regex: '^[^ ]{1,50}$',
    },
    phoneNum: {
        label: 'Phone number',
        regex: '^[0-9]{8}$',
    },
};

export function validateUser(
    data,
    fields = ['username', 'firstName', 'lastName', 'email', 'password', 'phoneNum']
) {
    const errors = {};

    for (const field of fields) {
        if(data[field] === undefined || data[field] === '') {
            errors[field] = fieldRequiredMessage(userFieldsLookup[field].label);
        }
        else if(!(new RegExp(userFieldsLookup[field].regex)).test(data[field])) {
            errors[field] = fieldInvalidMessage(userFieldsLookup[field].label);
        }
    }

    if(Object.keys(errors).length) {
        return fail(400, { errors });
    }

    return data;
}
