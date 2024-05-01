import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.bubble) {
		return {
			bubble: params.bubble
		};
	}

	error(404, 'Not found');
};