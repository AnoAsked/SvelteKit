import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }:any) => {
    if(url.pathname === "/app")
        return redirect(308, "/app/r/home");
}