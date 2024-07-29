import { error } from '@sveltejs/kit';

export const ssr = false;

function convertToFeatureCollection(data) {
	// Helper function to parse the "zonas" property string into an object
	function parseZonas(zonas) {
		try {
			return JSON.parse(zonas);
		} catch (e) {
			console.error("Error parsing 'zonas':", e);
			return null;
		}
	}
  
	// Map over the input data and transform each item
	const features = data.map(item => {
		const { id, name, dias, precio, estado, zonas } = item;
		const geometry = parseZonas(zonas);
		geometry.properties = { id, name, dias, precio, estado, zonas }
		return geometry;
	});
  
	// Create the final FeatureCollection object
	return {
		type: "FeatureCollection",
		features
	};
}  

export async function load({ fetch }) {
	const res = await fetch("https://api.gaudi.pe/zonas");
		
	if (!res.ok) {
		console.error(res);
		throw error(res.status);
	}

	let zonas = await res.json();

	zonas = convertToFeatureCollection(zonas)

	return { zonas }
}