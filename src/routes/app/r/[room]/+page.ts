import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.room) {
		return {
			room: params.room
		};
	}

	error(404, 'Not found');
};