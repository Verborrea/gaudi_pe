import { error } from '@sveltejs/kit';

export const ssr = false;

function convertToFeatureCollection(dataArray) {
    const featureCollection = {
        type: "FeatureCollection",
        features: []
    };

    dataArray.forEach(item => {
        item.zonas.features.forEach(feature => {
            const newFeature = {
                type: "Feature",
                geometry: feature.geometry,
                properties: {
                    id: item.id,
                    name: item.name,
                    dias: item.dias,
                    precio: item.precio,
                    estado: item.estado
                }
            };
            featureCollection.features.push(newFeature);
        });
    });

    return featureCollection;
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