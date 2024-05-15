import { validateUser } from '$lib/utils/validator.js'

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        const validationResult = validateUser(data, ['email', 'password']);

        if(validationResult.status === 400) {
            return validationResult;
        }

        return data
    }
}
