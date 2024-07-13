<script>
	import { cart, envio, info } from "$lib/stores.js"
	import src from "$lib/assets/yape.avif"
    import Yape from "$lib/compo/Yape.svelte"
	import { fade, fly } from "svelte/transition"

	export let data

	let dialog, showToast, error_message

	function isValidEmail(email) {
		const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return re.test(email);
	}

	function process() {			
		const name = $info.name
		const phone = $info.phone
		const email = $info.email

		const phoneNumber = phone.slice(3).replace(/\s+/g, "");

		if (!name || !email || !phoneNumber) {
			error_message = "❌ Debe colocar sus datos completos"
		} else if (phoneNumber.length !== 9) {
			error_message = "❌ Ingrese un número de teléfono válido"
		} else if (!isValidEmail(email)) {
			error_message = "❌ Ingrese un correo válido"
		} else {
			dialog.showModal()
			return
		}

		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 2000);
	}

	function handleInput(event) {
		if (!event.target.value.startsWith('+51 ')) {
			phone = '+51 ';
		}
	}
</script>

<svelte:head>
	<title>Gaudí | Finalizar Compra</title>
</svelte:head>

{#if showToast}
	<div in:fly={{ y: -200, duration: 500 }} out:fade class="toast">
		{error_message}
	</div>
{/if}
<div class="ma">
	<h1 class="title">Datos Personales</h1>
	<div class="hey">
		<section>
			<h2 class="rl">Detalles de facturación</h2>
			<form action="xd" method="post">
				<label for="name">
					<div>Nombre Completo<span>*</span></div>
					<input id="name" name="name" type="name" required bind:value={$info.name}>
				</label>
				<label for="phone">
					<div>Teléfono<span>*</span></div>
					<input id="phone" name="phone" type="tel" required bind:value={$info.phone} on:input={handleInput}>
				</label>
				<label for="email">
					<div>Correo Electrónico<span>*</span></div>
					<input id="email" name="email" type="email" required bind:value={$info.email}>
				</label>
				<label for="address">
					<div>Dirección</div>
					<input id="address" name="address" type="text" required bind:value={$info.address}>
				</label>
				<label for="country">
					<div>País</div>
					<input id="country" name="country" type="text" disabled value="Perú">
				</label>
				<label for="notes">
					<div>Notas del Pedido</div>
					<textarea rows="4" name="notes" id="notes" bind:value={$info.notes} placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."></textarea>
				</label>
			</form>
		</section>
		<section class="pedido">
			<h2 class="rl">Tu Pedido</h2>
			<div class="fc">
				<p>Producto</p>
				<p>Subtotal</p>
			</div>
			<hr>
			{#each $cart.items as item (item.id + item.d.toString())}
				<div class="fc">
					<p>{item.q} &times; {data.products.find(p => p.id === item.id).name}</p>
					<p>S/&nbsp;{(item.q * item.t).toFixed(2)}</p>
				</div>
			{/each}
			<hr>
			<div class="fc">
				<p>Subtotal</p>
				<p>S/&nbsp;{$cart.subtotal.toFixed(2)}</p>
			</div>
			<hr>
			<div class="fc">
				<p>Costo de Envío</p>
				{#if ($envio.price !== undefined)}
					<p>S/&nbsp;{$envio.price.toFixed(2)}</p>
				{:else}
					<p>Zona no disponible 🙁</p>
				{/if}
			</div>
			<hr>
			<div class="fc">
				<p>Fecha de Envío</p>
				{#if ($envio.dia !== undefined)}
					<p>{$envio.dia}</p>
				{:else}
					<p>Zona no disponible 🙁</p>
				{/if}
			</div>
			<hr>
			<div class="fc">
				<p>Total</p>
				<p>S/&nbsp;{($cart.subtotal + ($envio.price ?? 0)).toFixed(2)}</p>
			</div>
			<hr>
			<p>Método de pago vía QR, al realizar el pago se deberá adjuntar comprobante con el pedido del pedido.</p>
			<img {src} height="60" alt="Yape">
			<p>Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web </p>
			<button type="button" class="btn btn-main" on:click={process}>
				Proceder al Pago
			</button>
			<dialog bind:this={dialog}>
				<Yape
					products={data.products}
					name={$info.name}
					address={$info.address}
					phone={$info.phone}
					email={$info.email}
					notes={$info.notes}
				/>
			</dialog>
		</section>
	</div>
</div>

<style>
	dialog {
		border: none;
    	box-shadow: 0 0 20px 0px #00000096;
		max-width: 420px;
	}
	.hey {
		display: flex;
		align-items: start;
		gap: 64px;
		padding-bottom: 64px;
	}
	.hey>section:first-child {
		flex: 1;
	}
	.pedido {
		border: 2px solid var(--background);
		padding: 32px;
		max-width: 420px;
	}
	.pedido p {
		font-size: 14px;
		color: var(--disabled);
	}
	.pedido button {
		width: 100%;
	}
	.pedido h2 {
		margin: 0;
	}
	.pedido .fc {
		justify-content: space-between;
		gap: 16px;
	}
	.pedido .fc:nth-child(2) {
		margin-top: 12px;
	}
	.pedido .fc p {
		margin-block: 8px;
	}
	hr {
		background: var(--background);
	}
	span {
		color: var(--accent);
	}
	h2 {
		font-weight: 400;
	}
	h2::after {
		content: '';
		position: absolute;
		width: 64px;
		background: var(--text);
		height: 2px;
		left: 0;
		bottom: -4px;
	}
	form, label {
		display: flex;
		flex-direction: column;
	}
	form {
		gap: 16px;
	}
	label {
		gap: 8px;
	}
	input, textarea {
		border: 1px solid #cdcdcd;
		padding: 8px 16px;
		font-size: 16px;
	}
	input:focus, textarea:focus {
		outline: none;
		border-color: var(--text);
	}
	@media (max-width: 900px) {
		.hey {
			flex-direction: column;
			align-items: stretch;
		}
		.pedido {
			max-width: 100%;
		}
		dialog {
			max-width: calc(100% - 2em - 6px);
		}
	}
</style>