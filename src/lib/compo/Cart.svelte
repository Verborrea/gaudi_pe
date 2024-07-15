<script>
    import CartItem from "./CartItem.svelte"
	import { goto } from "$app/navigation"
	import { cart, envio } from "$lib/stores.js"
	
	export let products

	let form

	$:disabled = ($cart.quantity === 0) || ($envio.isSet === false)

	function out() {
		goto("/checkout")
		form.submit()
	}

	async function clearCart() {
		const res_dis = await fetch('https://api.gaudi.pe/discount')
		
		if (!res_dis.ok) {
			console.error(res_dis)
			throw error(res_dis.status)
		}

		const allowDiscount = await res_dis.json()
		cart.clear(allowDiscount.status)
	}
</script>

<header class="fc">
	<h2>Carrito de Compras</h2>
	<form bind:this={form} method="dialog">
		<button type="submit" title="Cerrar">
			<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#737373"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
		</button>
	</form>
</header>
<div class="items">
	{#each $cart.items as item (item.id + item.d.toString())}
		<CartItem
			products={products}
			id={item.id}
			t={item.t}
			q={item.q}
		/>
	{/each}
</div>
<footer>
	<div class="subtotal">
		Subtotal: <strong>S/&nbsp;{$cart.subtotal.toFixed(2)}</strong>
	</div>
	<button type="button" class="btn btn-outlined" on:click={clearCart}>
		Limpiar Carrito
	</button>
	<a href="/carrito" class="btn btn-main" on:click={form.submit()}>Ver Carrito</a>
	<button type="button" class="btn btn-main" {disabled} on:click={out}>
		Ingresar Datos
	</button>
</footer>

<style>
	header {
		justify-content: space-between;
	}
	header form {
		height: 40px;
	}
	footer {
		padding-top: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;		
	}
	strong {
		font-size: 18px;
	}
	button:hover path {
		fill: var(--accent);
	}
</style>