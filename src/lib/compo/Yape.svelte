<script>
	import { fade, fly } from "svelte/transition"
	import { cart, envio } from "$lib/stores.js"
	import { goto } from "$app/navigation"
	import src from "$lib/assets/codigo.avif"
	import Dragger from "./Dragger.svelte"

	export let products, name, address, phone, email, notes

	let yape
	let form
	let file = false
	let showToast = false
	let ready

	function copyNumber() {
		navigator.clipboard.writeText('910880595').then(() => {
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 2000);
		}).catch(err => {
			console.error("Error: ", err);
		});
	}

	function prevStep() {
		file = false
	}

	function nextStep() {
		file = true
	}

	async function finish() {
		if (ready) {
			const items = $cart.items.map(item => {
				let product = products.find(p => p.id === item.id);
				return {
					id: item.id,
					name: product.name,
					total: item.t,
					quantity: item.q
				};
			});

			const formData = new FormData();
			formData.append('file', yape);
			formData.append('nombre', name);
			formData.append('telefono', phone);
			formData.append('direccion', address);
			formData.append('longitud', $envio.coords[0]);
			formData.append('latitud', $envio.coords[1]);
			formData.append('email', email);
			formData.append('fecha', new Date().toISOString());
			formData.append('notas', notes);
			formData.append('envio', $envio.price.toFixed(2));
			formData.append('precio', ($cart.subtotal + $envio.price).toFixed(2));
			formData.append('ordersDetails', JSON.stringify(items.map((item) => {
					return {
						item_id: item.id,
						cantidad: item.quantity,
						total: item.total
					};
				}))
			)

			try {
				const response = await fetch('https://api.gaudi.pe/orders/create', {
					method: 'POST',
					body: formData
				});

				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const json = await response.json();
				yape = json.yape;

				ready = false;
			} catch (error) {
				console.error('Error:', error);
			}

			// Mandar los 2 correos mediante la api del frontend
			const response = await fetch('/api/buy', {
				method: 'POST',
				body: JSON.stringify({
					name,
					address,
					phone,
					email,
					notes,
					items,
					lng: $envio.coords[0],
					lat: $envio.coords[1],
					yape,
					subtotal: $cart.subtotal.toFixed(2),
					costo_envio: $envio.price.toFixed(2),
					total: ($cart.subtotal + $envio.price).toFixed(2)
				}),
				headers: {
					'content-type': 'application/json'
				}
			});

			let res = await response.json()
			if (res.status === 'success') {
				const res_dis = await fetch('https://api.gaudi.pe/discount')
		
				if (!res_dis.ok) {
					console.error(res_dis)
					throw error(res_dis.status)
				}

				const allowDiscount = await res_dis.json()
				cart.clear(allowDiscount.status)
				goto("/gracias")
			} else {
				alert(res.error.message)
			}
		}
	}
</script>

{#if showToast}
	<div in:fly={{ y: -200, duration: 500 }} out:fade class="toast">
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
		Número copiado al portapeles
	</div>
{/if}
<div class="container">
	{#if file}
	<header class="fc">
		<div class="fc gap8">
			<button type="button" on:click={prevStep}>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
			</button>
			<h3>Subir Captura</h3>
		</div>
		<form bind:this={form} method="dialog">
			<button type="submit" title="Cerrar">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
			</button>
		</form>
	</header>
	<div class="gapper">
		<Dragger bind:ready={ready} bind:yape={yape}/>
		<button type="button" class="btn btn-main" disabled={!ready} on:click={finish}>
			Finalizar Compra
		</button>
	</div>
	{:else}
	<header class="fc">
		<h3>Pagar Compra</h3>
		<form bind:this={form} method="dialog">
			<button type="submit" title="Cerrar">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
			</button>
		</form>
	</header>
	<img {src} alt="Código de Yape del gerente">
	<button type="button" class="fc number" on:click={copyNumber}>
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
		Copiar el número
	</button>
	<div>
		<p class="big">Cantidad a pagar</p>
		<h2>S/&nbsp;{($cart.subtotal + ($envio.price ?? 0)).toFixed(2)}</h2>
	</div>
	<p class="gray">Debes escanear el código QR, hacer clic en continuar para adjuntar la captura de pantalla (es el único comprobante de pago) y podrás completar la compra.</p>
	<button type="button" class="btn btn-main" on:click={nextStep}>
		Continuar
	</button>
	{/if}
</div>

<style>
	.gap8 {
		gap: 8px;
	}
	header {
		justify-content: space-between;
	}
	.gapper {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: stretch;
	}
	.number {
		justify-content: center;
		color: var(--disabled);
		font-size: 16px;
		gap: 8px;
	}
	.number:hover {
		color: var(--text);
	}
	.number:hover path {
		fill: var(--text);
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		text-align: center;
		gap: 16px;
	}
	header form {
		height: 24px;
	}
	header h3, p {
		margin: 0;
		font-weight: 400;
	}
	img {
		align-self: center;
		width: 75%;
		aspect-ratio: 1;
	}
	h2 {
		font-size: 42px;
		font-weight: 600;
		margin: 0;
	}
	.big {
		font-size: 20px;
		margin: 0;
	}
	.gray {
		color: var(--disabled);
		font-size: 15px;
	}
	@media (max-width: 900px) {
		h2 {
			font-size: 36px;
		}
		.number, .big {
			font-size: 18px;
		}
		.gray {
			font-size: 14px;
		}
	}
</style>