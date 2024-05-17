import { redirect } from '@sveltejs/kit'

// export async function load(event) {
//     event.cookies.delete('access_token', { path: '/' });
//     event.locals.user = null;

//     return redirect(303, '/login');
// }
export const actions = {
	default: async (event) => {
        event.cookies.delete('access_token', { path: '/' });
        event.locals.user = null;
    
        return redirect(303, '/login');
	}
};
