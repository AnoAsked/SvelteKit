import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.tag) {
		return {
			tag: params.tag
		};
	}

	error(404, 'Not found');
};