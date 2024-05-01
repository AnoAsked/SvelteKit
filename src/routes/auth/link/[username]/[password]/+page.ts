import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.username && params.password) {
		return {
			username: params.username,
			password: params.password
		};
	}

	error(404, 'Not found');
};