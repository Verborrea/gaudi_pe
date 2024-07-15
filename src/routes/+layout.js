import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load({ fetch }) {
	const res = await fetch("https://api.gaudi.pe/items");
		
	if (!res.ok) {
		console.error(res);
		throw error(res.status);
	}

	const products = await res.json();
	
	return {
		products: products.map(p => {return {...p, price: p.original}})
	}
}