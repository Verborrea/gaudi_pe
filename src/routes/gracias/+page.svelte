<main>
	<div class="ma fc">
		<div class="title">¡Gracias por su Compra!</div>
		<p>Revise su correo electrónico para encontrar su recibo de compra.</p>
		<a href="/tienda">Volver a la tienda</a>
	</div>
</main>

<style>
	.ma {
		text-align: center;
		flex-direction: column;
		justify-content: center;
		min-height: calc(100dvh - 398px);
	}
	.title {
		margin-top: 0;
		font-size: 64px;
		line-height: 1em;
	}
	a {
		color: var(--accent);
	}
	@media (max-width: 700px) {
		.title {
			font-size: 32px;
		}
	}
</style>