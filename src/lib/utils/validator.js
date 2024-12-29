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
    oldPassword: {
        label: 'Old password',
        regex: '^[^ ]{1,50}$',
    },
    phoneNum: {
        label: 'Phone number',
        regex: '^[0-9]{8}$',
    },
    deletedAt: {
        label: 'Deleted at',
    },
    blocked: {
        label: 'Blocked',
    },
};

export function validateUser(
    data,
    fields = ['username', 'firstName', 'lastName', 'email', 'password', 'phoneNum'],
    formId,
) {
    return baseValidator(data, fields, userFieldsLookup, formId);
}

export const propertyFieldsLookup = {
    name: {
        label: 'Name',
        regex: '^[a-zA-Z0-9 ]{3,50}$',
    },
    place: {
        label: 'Location',
        regex: '^[a-zA-Z0-9 ]{3,100}$',
    },
    description: {
        label: 'Description',
        regex: '^[^]{0,2500}$',
        message: 'Must be valid description, less than 2500 characters',
    },
    lon: {
        label: 'Longitude',
        regex: '^-?[0-9]+(\\.?[0-9]+)?$',
    },
    lat: {
        label: 'Latitude',
        regex: '^-?[0-9]+(\\.?[0-9]+)?$',
    },
    pricePerNight: {
        label: 'Price per night',
        regex: '^[0-9]+(\\.?[0-9]+)?$',
    },
    images: {
        label: 'Images',
    },
    blocked: {
        label: 'Blocked',
    },
};

export function validateProperty(
    data,
    fields = ['name', 'place', 'lon', 'lat', 'pricePerNight', 'images'],
    formId,
) {
    return baseValidator(data, fields, propertyFieldsLookup, formId);
}

export const commentFieldsLookup = {
    description: {
        label: 'Description',
        regex: '^[^]{0,2500}$',
        message: 'Must be valid description, less than 2500 characters',
    },
};

export function validateComment(
    data,
    fields = ['description'],
    formId,
) {
    return baseValidator(data, fields, commentFieldsLookup, formId);
}

function baseValidator(data, fields, fieldsLookup, formId) {
    fields = [...new Set(fields)]; //remove field duplicates
    fields = fields.filter((field) => fieldsLookup[field]); //only check fields in the lookup

    const errors = {};

    for (const field of fields) {
        if(data[field] === undefined || data[field] === '' || data[field]?.length === 0 || data[field]?.[0]?.size === 0) {
            errors[field] = fieldRequiredMessage(fieldsLookup[field].label);
        }
        else if(field === 'images') {
            errors[field] = validateImages(data[field]);
        }
        else if(fieldsLookup[field].regex && !(new RegExp(fieldsLookup[field].regex)).test(data[field])) {
            errors[field] = fieldsLookup[field].message ?? fieldInvalidMessage(fieldsLookup[field].label);
        }
    }

    if(Object.values(errors).filter(Boolean).length) {
        if(formId) {
            return fail(400, { [formId]: { errors } });
        }

        return fail(400, { errors });
    }

    //only return fields that have been validated
    return Object.fromEntries(
        Object.entries(data).filter(([ key ]) => {
            return fields.includes(key);
        })
    );
}

function validateImages(images) {
    if(!Array.isArray(images)) {
        return 'Invalid image list';
    }
    if(images.length < 3) {
        return 'Atleast 3 images need to be selected';
    }

    for (const image of images) {
        if(!(image instanceof File)) {
            return 'Invald image file(s)';
        }
        if(image.size > 1000000) {
            return 'Image size too big, must be under 1 megabyte';
        }
        if(!/^image\/(avif|jpeg|png|webp)$/.test(image.type)) {
            return 'Incorrect image format (accepted formats: .avif, .jpg, .jpeg, .png, .webp)';
        }
    }
}
