<script>
	import { goto } from "$app/navigation"
	import { cart, envio } from "$lib/stores.js"
    import TableItem from "$lib/compo/TableItem.svelte"
	import { fade, fly } from "svelte/transition"

	export let data;

	let showToast_1 = false, showToast_2 = false, showToast_3 = false

	function checkIfEmpty() {
		if ($cart.quantity === 0) {
			showToast_1 = true;
			setTimeout(() => {
				showToast_1 = false;
			}, 2000);
		} else if ($envio.isSet === false) {
			showToast_2 = true;
			setTimeout(() => {
				showToast_2 = false;
			}, 2000);
		} else if ($envio.price === undefined) {
			showToast_3 = true;
			setTimeout(() => {
				showToast_3 = false;
			}, 2000);
		} else {
			goto("/checkout")
		}
	}

	async function clearCart() {
		cart.clear()
	}
</script>

{#if showToast_1}
	<div in:fly={{ y: -200, duration: 500 }} out:fade class="toast">
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
		No ha seleccionado ningún producto 🫗
	</div>
{/if}
{#if showToast_2}
	<div in:fly={{ y: -200, duration: 500 }} out:fade class="toast">
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
		Debe seleccionar su ubicación de envío 📍
	</div>
{/if}
{#if showToast_3}
	<div in:fly={{ y: -200, duration: 500 }} out:fade class="toast">
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#737373"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
		Su zona de envío no está disponible 📍
	</div>
{/if}

<svelte:head>
	<title>Gaudí | Mi Carrito</title>
</svelte:head>

<main>
	<h1 class="title">Mi Carrito</h1>
	<section class="ma">
		<div class="table">
			<table>
				<thead>
					<tr>
						<th>PRODUCTO</th>
						<th>PRECIO</th>
						<th>CANTIDAD</th>
						<th>SUBTOTAL</th>
					</tr>
				</thead>
				<tbody>
					{#each $cart.items as item (item.id + item.d.toString())}
						<TableItem 
							products={data.products}
							id={item.id}
							t={item.t}
							q={item.q}
						/>
					{/each}
				</tbody>
			</table>
			<hr>
			<button class="limpiar" type="button" on:click={clearCart}>
				<strong>Limpiar Carrito</strong>
			</button>
		</div>
		<div>
			<div class="details">
				<h3>Totales del carrito</h3>
				<div class="fc">
					<h4>Subtotal</h4>
					<p>S/&nbsp;{$cart.subtotal.toFixed(2)}</p>
				</div>
				<div class="fc">
					<h4 class="fc">
						Ubicación GPS
						{#if $envio.isSet === false}
						<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#737373"><path d="m429-316 260-259-69-69-191 190-87-86-69 69 156 155Zm51 252q-85.64 0-161.48-32.52-75.84-32.52-132.66-89.34-56.82-56.82-89.34-132.66T64-480q0-86.9 32.58-162.46 32.58-75.57 89.5-132.55Q243-832 318.74-864q75.74-32 161.26-32 86.89 0 162.44 32Q718-832 775-775t89 132.58q32 75.59 32 162.5 0 85.92-32 161.42-32 75.5-88.99 132.42-56.98 56.92-132.55 89.5Q566.9-64 480-64Zm0-98q132.51 0 225.26-92.74Q798-347.49 798-480t-92.74-225.26Q612.51-798 480-798t-225.26 92.74Q162-612.51 162-480t92.74 225.26Q347.49-162 480-162Zm0-318Z"/></svg>
						{:else if $envio.dia.length === 0}
						<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#E72832"><path d="m339-288 141-141 141 141 51-51-141-141 141-141-51-51-141 141-141-141-51 51 141 141-141 141 51 51ZM480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Z"/></svg>
						{:else}
						<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#2bc54a"><path d="m429-316 260-259-69-69-191 190-87-86-69 69 156 155Zm51 252q-85.64 0-161.48-32.52-75.84-32.52-132.66-89.34-56.82-56.82-89.34-132.66T64-480q0-86.9 32.58-162.46 32.58-75.57 89.5-132.55Q243-832 318.74-864q75.74-32 161.26-32 86.89 0 162.44 32Q718-832 775-775t89 132.58q32 75.59 32 162.5 0 85.92-32 161.42-32 75.5-88.99 132.42-56.98 56.92-132.55 89.5Q566.9-64 480-64Z"/></svg>
						{/if}
					</h4>
					<p><a href="/mapa">{ $envio.isSet ? "Cambiar ubicación" : "Seleccione su ubicación" }</a></p>
				</div>
				{#if ($envio.dia.length === 0)}
				<p>Si su zona de envío no está en el mapa o tiene alguna otra pregunta no dude en <a href="https://wa.me/51978685152" target="_blank">contactarnos mediante WhatsApp 📞</a></p>
				{/if}
				<div class="fc">
					<h4>Envío</h4>
					{#if ($envio.dia.length > 0)}
						<p>S/&nbsp;{$envio.price.toFixed(2)}</p>
					{:else}
						<p>Zona no disponible 🙁</p>
					{/if}
				</div>
				<hr>
				<div class="fc">
					<h4>Total</h4>
					<p>S/&nbsp;{($cart.subtotal + ($envio.price ?? 0)).toFixed(2)}</p>
				</div>
			</div>
			<button type="button" class="btn btn-main" on:click={checkIfEmpty}>
				Ingresar Datos
			</button>
		</div>
	</section>
</main>

<style>
	h4.fc {
		gap: 6px;
	}
	main {
		padding-block: 64px;
	}
	.title {
		margin-top: 0;
	}
	.btn {
		width: 100%;
	}
	.limpiar {
		font-size: 16px;
		float: right;
	}
	.limpiar:hover {
		color: var(--accent);
	}
	th {
		color: var(--disabled);
		font-weight: 400;
		font-size: 13px;
	}
	.ma {
		display: flex;
		gap: 32px;
		align-items: flex-start;
	}
	.table {
		flex: 1;
	}
	table {
		width: 100%;
		border-spacing: 8px 16px;
	}
	a {
		color: var(--accent);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	.details {
		padding: 16px;
		background: var(--background);
		font-size: 14px;
		min-width: 320px;
		max-width: 400px;
	}
	.details .fc {
		justify-content: space-between;
	}
	h4, p {
		margin: 0.5em;
	}
	a[href="/mapa"] {
		color: var(--accent);
		text-decoration: none;
	}
	a[href="/mapa"]:hover {
		text-decoration: underline;
	}
	hr {
		background: var(--background);
	}
	.details hr {
		background: var(--disabled);
	}
	@media (max-width: 1000px) {
		main {
			padding-block: 16px;
		}
		.ma {
			flex-direction: column;
			align-items: stretch;
		}
		a {
			text-decoration: underline;
		}
		.details {
			max-width: unset;
		}
	}
</style>