<script>
	import mapboxgl from "mapbox-gl"
	import { polygon } from "@turf/helpers"
	import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon"
	import { onMount, tick } from "svelte"
	import { envio } from "$lib/stores.js"

	export let data

	const zones = JSON.parse(data.zonas)
	const formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

	const days = {
		L: 'Lunes',
		M: 'Martes',
		X: 'Miércoles',
		J: 'Jueves',
		V: 'Viernes',
		S: 'Sábado',
		D: 'Domingo'
	}
			
	function obtenerPropiedadDeZona(punto) {
		for (const zona of zones.features) {
			const turfPoly = polygon(zona.geometry.coordinates)
			if (booleanPointInPolygon(punto, turfPoly)) {
				return zona.properties;
			}
		}
		return null;
	}

	onMount(() => {
		let map = new mapboxgl.Map({
			container: 'map',
			center: $envio.coords,
			zoom: 12,
			style: 'mapbox://styles/mapbox/light-v11',
			accessToken: 'pk.eyJ1IjoiYWxhbi0yNSIsImEiOiJjbGViaGI4aDkwcHpxM25udTAwaWcyczFrIn0.MZhpce5K1n4Gi7xBVGFj6Q'
		})

		let marker = new mapboxgl.Marker()
			.setLngLat($envio.coords)
			.addTo(map)

		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				// When active the map will receive updates to the device's location as it changes.
				trackUserLocation: true,
				// Draw an arrow next to the location dot to indicate which direction the device is heading.
				showUserHeading: true
			})
		);

		map.on('load', () => {
			map.addSource('zones', {
				type: 'geojson',
				data: zones
			});

			// Capa de relleno con transparencia
			map.addLayer({
				'id': 'zones-fill',
				'type': 'fill',
				'source': 'zones',
				'paint': {
					'fill-color': 'rgba(0,0,0,0.25)'
				}
			});

			// Capa de líneas opacas
			map.addLayer({
				'id': 'zones-line',
				'type': 'line',
				'source': 'zones',
				'paint': {
					'line-color': 'black',
					'line-width': 2
				}
			});
		});

		map.on('move', (e) => {
			marker.setLngLat(map.getCenter())
		});

		map.on('moveend', (e) => {
			let zone = obtenerPropiedadDeZona(map.getCenter().toArray())
			$envio.isSet = true
			$envio.price = zone?.precio || 0
d
			$envio.dia = zone?.dias?.map(d => days[d]) || []
			$envio.coords = map.getCenter().toArray()
		})

		const initial_zone = obtenerPropiedadDeZona(map.getCenter().toArray())
		$envio.isSet = true
		$envio.price = initial_zone?.precio || 0
		$envio.dia = initial_zone?.dias?.map(d => days[d]) || []
		$envio.coords = map.getCenter().toArray()
	})
</script>

<svelte:head>
	<title>Gaudí | Zona de envío</title>
	<link href='https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<main>
	<div class="ma">
		<h1 class="title">Seleccione su ubicación</h1>
		<div class="cols">
			<div id="map"></div>
			<div class="info">
				<p class="nm">Por favor seleccione la dirección de envío en el mapa</p>
				{#if ($envio.dia.length > 0)}
					<div class="fc">
						<p>Costo de envío:</p>
						<p>S/&nbsp;{$envio.price.toFixed(2)}</p>
					</div>
					<div class="fc">
						<p>Día(s) de envío:</p>
						<p>{formatter.format($envio.dia)}</p>
					</div>
				{:else}
					<p>
						Pongase en contacto con nosotros para el precio del envío. Puede escribirnos
						a cualquiera de los siguientes números:
					</p>
					<ul>
						<li>
							<a href="https://wa.me/51978685152" target="_blank">+51 978 685 152</a>
						</li>
						<li>
							<a href="https://wa.me/51910880595" target="_blank">+51 910 880 595</a>
						</li>
					</ul>
				{/if}
				<a href="/carrito" class="btn btn-main">Continuar</a>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		padding-bottom: 64px;
	}
	.cols {
		display: flex;
		gap: 32px;
		align-items: center;
	}
	#map {
		flex: 0 0 50%; 
		height: 480px;
		width: min(100%, 800px);
	}
	.info {
		flex: 0 1 50%; 
		border: 2px solid var(--background);
		padding: 32px;
	}
	p, ul {
		font-size: 16px;
    	color: var(--disabled);
	}
	.nm {
		margin: 0;
	}
	li>a {
		color: var(--accent);
	}
	.fc {
		justify-content: space-between;
    	gap: 16px;
	}
	@media (max-width: 700px) {
		p {
			font-size: 14px;
		}
		#map {
			height: 400px;
		}
		#map, .info {
			flex: unset;
		}
		.cols {
			flex-direction: column;
		}
		main {
			padding-bottom: 0;
		}
	}
</style>