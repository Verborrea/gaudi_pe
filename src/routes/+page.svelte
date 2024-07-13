<script>
	import Nosotros from "./Nosotros.svelte";
	import BackToTop from "$lib/compo/BackToTop.svelte";
	import { onMount } from "svelte"
    import Ofrecemos from "./Ofrecemos.svelte";
    import Contacto from "./Contacto.svelte";

	let currentIndex = 0
	let title = "Hola! Somos Gaudí."
	let displayTitle = ""
	let page = 0

	onMount(() => {
		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % 3
		}, 5000)

		// Typewriter
		let i = 0;
		function typeWriter() {
			if (i < title.length) {
				displayTitle += title.charAt(i);
				i++;
				setTimeout(typeWriter, 200); // Ajusta la velocidad de la animación
			}
		}
		typeWriter();

		return () => clearInterval(interval)
	});

	function setPage(_page) {
		page = _page
	}
</script>

<svelte:head>
	<title>Gaudí Nutracéuticos</title>
	<meta name="description" content="Descubre Gaudi 🌱, tu fuente de Kombucha artesanal en Perú. Nuestras bebidas de Kombucha son 100% naturales y están llenas de beneficios para la salud. ¡Visítanos para saber más!">
	<meta name="og:url" content="https://gaudi.pe">
	<meta name="og:type" content="website">
	<meta name="og:title" content="Gaudí Nutracéuticos">
	<meta name="og:description" content="Descubre Gaudi 🌱, tu fuente de Kombucha artesanal en Perú. Nuestras bebidas de Kombucha son 100% naturales y están llenas de beneficios para la salud. ¡Visítanos para saber más!">
	<meta name="og:site_name" content="Gaudí">
	<meta property="og:image" content="https://gaudi.pe/og_image.jpeg" />
	<meta property="og:image:secure_url" content="https://gaudi.pe/og_image.jpeg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Tres latas de Kombucha Gaudí de distintos sabores" />
</svelte:head>

<main class="rl">
	<div
		class="img"
		class:src_1={currentIndex === 0}
		class:src_2={currentIndex === 1}
		class:src_3={currentIndex === 2}
		alt="Carrusel de latas"
	></div>
	<div class="hero ma">
		<p class="sub">Un placer conocerte</p>
		<h1 class="title">Gaudí</h1>
		<a class="sub" href="/tienda">Échale un vistazo a nuestros últimos productos</a>
		<section>
			<h1>Síguenos</h1>
			<div class="fc">
				<a target="_blank" href="https://www.facebook.com/profile.php?id=61559996349902">
					FB
				</a>
				<a target="_blank" href="https://www.instagram.com/gaudi_pe/">
					IG
				</a>
				<a target="_blank" href="https://www.tiktok.com/@gaudi_pe">
					TK
				</a>
			</div>
		</section>
	</div>
	<div class="general ma">
		<h2 class="title">{displayTitle}</h2>
		<nav class="fc">
			<button type="button" aria-current={page === 0} on:click={()=>setPage(0)}>NOSOTROS</button>
			<button type="button" aria-current={page === 1} on:click={()=>setPage(1)}>OFRECEMOS</button>
			<button type="button" aria-current={page === 2} on:click={()=>setPage(2)}>CONTACTOS</button>
		</nav>
		{#if page === 0}
			<Nosotros/>
		{:else if page === 1}
			<Ofrecemos/>
		{:else}
			<Contacto/>
		{/if}
	</div>
	<BackToTop />
</main>

<style>
	main {
		--header: 120px;
		min-height: calc(100dvh - var(--header));	
	}
	nav.fc {
		gap: 0;
	}
	nav > button {
		flex: 1;
		color: var(--text);
		padding: 12px;
		font-size: 12px;
		border-radius: 8px 8px 0 0;
		letter-spacing: .35em;
		border-bottom: 1px solid var(--gray-light);
		transition: all 0.4s;
	}
	nav > button[aria-current="true"] {
		background: var(--text);
		color: var(--secondary);
	}
	.general {
		max-width: 900px;
		overflow-x: hidden;
	}
	.general .title {
		font-size: 64px;
		line-height: 70px;
		text-align: center;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 340px;
		margin: auto;
	}
	.hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: calc(100dvh - var(--header));
		color: white;
		padding-bottom: calc(var(--header) + 16px);
	}
	.sub {
		font-size: 24px;
	}
	.hero .title {
		font-family: 'Lora', serif;
		text-align: left;
		font-size: 100px;
		margin: 0;
	}
	.img {
		position: absolute;
		top: -120px;
		z-index: -1;
		width: 100%;
		height: 100dvh;
		filter: brightness(0.5);
		background-size: cover;
		background-position: center;
		transition: background-image 1s ease-in-out;
	}
	.img::after{
		position:absolute; width:0; height:0; overflow:hidden; z-index:-1; 
		content:
			url("$lib/assets/slides/slide-01.avif")
			url("$lib/assets/slides/slide-02.avif")
			url("$lib/assets/slides/slide-03.avif");
	}
	.src_1 {
		background-image: url("$lib/assets/slides/slide-01.avif");
	}
	.src_2 {
		background-image: url("$lib/assets/slides/slide-02.avif");
	}
	.src_3 {
		background-image: url("$lib/assets/slides/slide-03.avif");
	}
	a {
		color: white;
		text-decoration: none;
	}
	a:hover {
		color: var(--gray-light);
	}
	.fc {
		gap: 16px;
	}
	.fc a{
		font-size: 36px;
	}
	.fc a:hover {
		transform: scale(1.1);
	}
	@media (max-width: 900px) {
		nav {
			flex-direction: column;
			align-items: stretch;
			border-radius: 8px;
			overflow: hidden;
		}
		nav>button {
			border-radius: 0;
			background: var(--gray-light);
			border-color: white;
		}
		main {
			--header: 90px;
		}
		.img {
			top: -90px;
		}
		.title {
			font-size: 80px;
		}
		.sub {
			font-size: 18px;
		}
	}
</style>