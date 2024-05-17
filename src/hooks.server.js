import { redirect } from '@sveltejs/kit';
import { verifyAccessToken } from '$lib/utils/authenticator.js';

export async function handle({ event, resolve }) {
	const token = event.cookies.get('access_token');
	let redirectUrl = '/login';

	if(event.url.pathname !== redirectUrl) {
		redirectUrl = redirectUrl + `?redirectTo=${event.url.pathname + event.url.search}`;
	}

	if(!token) {
		if(event.route.id && !event.route.id.includes('(protected)')) {
			return await resolve(event);
		}
		else {
			return redirect(303, redirectUrl);
		}
	}

	const verificationResult = verifyAccessToken(token);

	if(verificationResult.status === 401) {
		if(event.url.pathname !== '/login') {
			return redirect(303, redirectUrl);
		}
		else {
			return await resolve(event);
		}
	}

	if(event.route.id?.includes('(admin)') && verificationResult.role !== 'admin') {
		return redirect(303, '/account');
	}

	event.locals.user = verificationResult;

	return await resolve(event);
}
