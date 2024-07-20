import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load({ fetch }) {
	const res = await fetch("https://api.gaudi.pe/zonas");
		
	if (!res.ok) {
		console.error(res);
		throw error(res.status);
	}

	const zonas = await res.json();
	
	return {
		zonas
	}
}