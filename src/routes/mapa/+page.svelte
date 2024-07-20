<script>
	import mapboxgl from "mapbox-gl"
	import { polygon } from "@turf/helpers"
	import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon"
	import { onMount } from "svelte"
	import { envio } from "$lib/stores.js"

	export let data

	function obtenerPropiedadDeZona(punto) {
		for (const zona of data.zonas.features) {
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
			center: [-71.536973, -16.398822],
			zoom: 12,
			style: 'mapbox://styles/mapbox/light-v11',
			accessToken: 'pk.eyJ1IjoiYWxhbi0yNSIsImEiOiJjbGViaGI4aDkwcHpxM25udTAwaWcyczFrIn0.MZhpce5K1n4Gi7xBVGFj6Q'
		})

		let marker = new mapboxgl.Marker()
			.setLngLat([-71.536973, -16.398822])
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
				data: data.zonas
			});

			const matchFillExpression = ['match', ['get', 'dias']];
			const matchLineExpression = ['match', ['get', 'dias']];

			// Colores transparentes para los rellenos
			matchFillExpression.push('lunes', 'rgba(222,50,76,0.3)');
			matchFillExpression.push('martes', 'rgba(244,137,95, 0.3)');
			matchFillExpression.push('miercoles', 'rgba(248,225,111, 0.3)');
			matchFillExpression.push('jueves', 'rgba(149,207,146, 0.3)');
			matchFillExpression.push('viernes', 'rgba(54,154,204, 0.3)');
			matchFillExpression.push('sabado', 'rgba(150,86,162, 0.3)');
			matchFillExpression.push('rgba(0, 0, 0, 0)');

			// Colores opacos para las líneas
			matchLineExpression.push('lunes', '#de324c');
			matchLineExpression.push('martes', '#f4895f');
			matchLineExpression.push('miercoles', '#f8e16f');
			matchLineExpression.push('jueves', '#95cf92');
			matchLineExpression.push('viernes', '#369acc');
			matchLineExpression.push('sabado', '#9656a2');
			matchLineExpression.push('rgb(0, 0, 0)');

			// Capa de relleno con transparencia
			map.addLayer({
				'id': 'zones-fill',
				'type': 'fill',
				'source': 'zones',
				'paint': {
					'fill-color': matchFillExpression
				}
			});

			// Capa de líneas opacas
			map.addLayer({
				'id': 'zones-line',
				'type': 'line',
				'source': 'zones',
				'paint': {
					'line-color': matchLineExpression,
					'line-width': 1
				}
			});
		});

		map.on('move', (e) => {
			marker.setLngLat(map.getCenter())
		});

		$envio.isSet = true
		$envio.price = 3
		$envio.dia = "Lunes y Sábado"
		$envio.coords = map.getCenter().toArray()

		const preciosDict = {
			lunes: 5,
			martes: 5,
			miercoles: 5,
			jueves: 5,
			viernes: 5,
			sabado: 5
		}
			
		const diasDict = {
			lunes: "Lunes",
			martes: "Martes",
			miercoles: "Miércoles",
			jueves: "Jueves",
			viernes: "Viernes",
			sabado: "Sábado"
		}

		map.on('moveend', (e) => {
			let zone = obtenerPropiedadDeZona(map.getCenter().toArray())
			$envio.isSet = true
			$envio.price = preciosDict[zone?.dias]
			$envio.dia = diasDict[zone?.dias]
			if (zone.nombre == 'centro arriba' || zone.nombre == 'centro abajo') {
				$envio.price = 3
				$envio.dia = 'Lunes y Sábado'
			}
			$envio.coords = map.getCenter().toArray()
		})
	})
</script>

<svelte:head>
	<link href='https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<main>
	<div class="ma">
		<h1 class="title">Seleccione su ubicación</h1>
		<div class="cols">
			<div id="map"></div>
			<div class="info">
				<p class="nm">Por favor seleccione la dirección de envío en el mapa</p>
				{#if ($envio.price !== undefined)}
					<div class="fc">
						<p>Costo de envío:</p>
						<p>S/&nbsp;{$envio.price.toFixed(2)}</p>
					</div>
					<div class="fc">
						<p>Día de envío:</p>
						<p>{$envio.dia}</p>
					</div>
				{:else}
					<p>Pongase en contacto con nosotros para el precio del envío.</p>
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
	p {
		font-size: 16px;
    	color: var(--disabled);
	}
	.nm {
		margin: 0;
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