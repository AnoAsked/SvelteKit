import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }:any) => {
    if(url.pathname === "/")
        return redirect(308, "/auth");
}