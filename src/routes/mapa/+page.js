import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load({ fetch }) {
	const res = await fetch("https://api.gaudi.pe/zonas");
		
	if (!res.ok) {
		console.error(res);
		throw error(res.status);
	}

	let zonas = await res.json();

	zonas =
`
	{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
	    "id": 1,
	  	"precio": 5,
	  	"dias": ["Lunes", "Martes", "Sábado"]
	  },
      "geometry": {
        "coordinates": [
          [
            [
              -71.58427137162141,
              -16.378648880859657
            ],
            [
              -71.58427137162141,
              -16.448732409408876
            ],
            [
              -71.4785889974782,
              -16.448732409408876
            ],
            [
              -71.4785889974782,
              -16.378648880859657
            ],
            [
              -71.58427137162141,
              -16.378648880859657
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
}
`
	// zonas = `{"type": "FeatureCollection","features": ${JSON.stringify(zonas)}}`
	
	return { zonas }
}