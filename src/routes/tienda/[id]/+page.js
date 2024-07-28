import { error } from '@sveltejs/kit';

export const ssr = false;

function obtenerTresElementosAleatorios(array) {
	const resultado = new Set();

	while (resultado.size < 3) {
		const indiceAleatorio = Math.floor(Math.random() * array.length);
		resultado.add(array[indiceAleatorio]);
	}

	return Array.from(resultado);
}

export async function load({ fetch, params }) {

	const res = await fetch("https://api.gaudi.pe/items");
		
	if (!res.ok) {
		console.error(res);
		throw error(res.status);
	}

	let products = await res.json();
	products = products.map(p => {return {...p,
		price: p.original, 
		special_discount: 0.5,
		special_discount_quantity: 4
	}})

	const product = products.find((p) => p.id == params.id);

	if (!product) throw error(404);

	return {
		product,
		products: obtenerTresElementosAleatorios(products)
	};
}
